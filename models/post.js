//dependencies
const mongoose = require('mongoose');


//Schema
const postSchema = mongoose.Schema({
  author: {type: String, default: ''},
  image: {type: String, default: ''},
  post: {type: String},
  comments: [{ type: String }]

});

const Post = mongoose.model('Post', postSchema);


//export
module.exports = Post;
