const mongoose = require("mongoose");



/*** MONGOOSE/MODEL CONFIG ***/
mongoose.connect("mongodb://localhost:27017/blog-app"); 
const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    created : {type: Date, default: Date.now},
    image : String,
    body : String
});
const Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title : "Blog 1",
    author : "CGRSmith",
    image : "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
    body : "Body text for Blog post 1, truncates after some characters..." 
});

Blog.create({
    title : "Blog 2",
    author : "CGRSmith",
    image : "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
    body : "Body text for Blog post 2, truncates after some characters..." 
});