const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const parser = require("body-parser");
const methodOverride = require("method-override");
const sanitizer = require("sanitize-html");

const port = process.env.PORT || 3000;

/*** APP CONFIG ***/
app.use(parser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

/*** MONGOOSE/MODEL CONFIG ***/
mongoose.connect("mongodb://localhost:27017/blog-app"); 
const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    created : {type: Date, default: Date.now()},
    image : String,
    content : String
});
const Blog = mongoose.model("Blog", blogSchema);

/*** ROUTING ***/
//Default
app.get("/", function(req, res) {
    res.redirect("/blog");
});

//Index
app.get("/blog", function(req, res) {
    Blog.find({})
        .limit(5)
        .sort({created : -1})
        .exec(function(err, dbBlogs) {
        if (err) throw err;
        res.render("index", {blogs : dbBlogs});
    });
});

//New
app.get("/blog/new", function(req, res) {
    res.render("new");
});

//Create
app.post("/blog", function(req, res) {
    Blog.create(createSanitizedInput(req.body.blog),
    function(err, submission){
        if (err) {
            res.redirect("/blog/new");
        } else {
            res.redirect("/blog");
        }
        
    });
});


//Show
app.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, dbBlog) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.render("show", {blog : dbBlog});
        }
    });
});

//Edit
app.get("/blog/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, dbBlog) {
        if (err) {
            //createSanitizedInput(req.body.blog)
            res.redirect("/blog/" + req.params.id);
        } else {
            res.render("edit", {blog : dbBlog});
        }
    });
});

//Update
app.put("/blog/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, createSanitizedInput(req.body.blog), function(err, dbBlog) {
        if (err) {
            res.redirect("/blog/" + req.params.id + "/edit");
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

//Delete
app.delete("/blog/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/blog/" + req.params.id + "/edit");
        } else {
            res.redirect("/blog");
        }
    });
});
    
app.listen(port, function(req, res) {
    console.log("Blog App listening on Port: " + port);
});


/*** WORKER FUNCTIONS***/
function createSanitizedInput(blogObject) {
    return {
        title : blogObject.title,
        author : "Cameron",
        created : Date.now(),
        image : blogObject.image,
        content : sanitizer(blogObject.content)
    }
}