const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const parser = require("body-parser");

const port = process.env.PORT || 3000;

/*** APP CONFIG ***/
app.use(parser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/*** MONGOOSE/MODEL CONFIG ***/
mongoose.connect("mongodb://localhost:27017/blog-app"); 
const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    created : {type: Date, default: Date.now()},
    image : String,
    body : String
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
        .limit(3)
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
    Blog.create({
        title : req.body.blog.title,
        author : "Cameron",
        created : Date.now(),
        image : req.body.blog.imageLink,
        body : req.body.blog.content
    }, function(err, submission){
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

app.listen(port, function(req, res) {
    console.log("Blog App listening on Port: " + port);
});