const mongoose = require("mongoose");



/*** MONGOOSE/MODEL CONFIG ***/
mongoose.connect("mongodb://localhost:27017/blog-app"); 
const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    created : {type: Date, default: Date.now},
    image : String,
    content : String
});
const Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title : "Blog 1",
    author : "CGRSmith",
    image : "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum sit \
    amet elit et eleifend. Cras sed pretium odio. Curabitur id diam arcu. Quisque in scelerisque \
    elit, quis scelerisque risus. Duis euismod aliquet faucibus. Duis non ex lectus. Duis luctus \
    sed odio sed posuere. Curabitur finibus sem felis, ut maximus mi semper eget. Integer tempus eleifend \
    libero consequat mollis. Integer massa tellus, pretium ac suscipit eget, scelerisque et arcu. Sed posuere \
    ac justo eu porttitor.</p> <p>Aliquam et urna quis ante consectetur posuere. Aenean id commodo turpis. Morbi eu pulvinar \
    lectus. Praesent sit amet hendrerit elit. Suspendisse nec lectus rhoncus, dapibus neque quis, dictum lacus. Duis tincidunt\
     ut orci nec rutrum. Vestibulum rhoncus massa dolor, et molestie quam posuere facilisis. Lorem ipsum dolor sit amet,\
      consectetur adipiscing elit. Integer blandit magna sed lacinia bibendum. Interdum et malesuada fames ac ante ipsum primis\
       in faucibus.</p>" 
});

Blog.create({
    title : "Blog 2",
    author : "CGRSmith",
    image : "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum sit \
     amet elit et eleifend. Cras sed pretium odio. Curabitur id diam arcu. Quisque in scelerisque \
     elit, quis scelerisque risus. Duis euismod aliquet faucibus. Duis non ex lectus. Duis luctus \
     sed odio sed posuere. Curabitur finibus sem felis, ut maximus mi semper eget. Integer tempus eleifend \
     libero consequat mollis. Integer massa tellus, pretium ac suscipit eget, scelerisque et arcu. Sed posuere \
     ac justo eu porttitor.</p> <p>Aliquam et urna quis ante consectetur posuere. Aenean id commodo turpis. Morbi eu pulvinar \
     lectus. Praesent sit amet hendrerit elit. Suspendisse nec lectus rhoncus, dapibus neque quis, dictum lacus. Duis tincidunt\
      ut orci nec rutrum. Vestibulum rhoncus massa dolor, et molestie quam posuere facilisis. Lorem ipsum dolor sit amet,\
       consectetur adipiscing elit. Integer blandit magna sed lacinia bibendum. Interdum et malesuada fames ac ante ipsum primis\
        in faucibus.</p>" 
});