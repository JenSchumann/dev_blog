//dependencies
const mongoose = require('mongoose');
const Post = require('./post.js');


//Schema
const adminSchema = mongoose.Schema({

  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  post: [Post.schema]

});

const Admin = mongoose.model('Admin', adminSchema);


//export
module.exports = Admin;
