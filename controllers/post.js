const express = require('express');
const router = express.Router()
const Post = require('../models/post.js');
//when I create an admin login for myself to access my blog securely:
//const Admin = require('../models/admin.js');

//index route
router.get('/', function(req, res){
  Post.find({}, function(err, foundPost){
    res.json(foundPost);
  });
});

//show route
router.get('/:id', (req, res)=> {
  Post.find({_id : req.params.id }, function(err, foundPost){
    res.send(foundPost);
  });
});

//create route
router.post('/', function(req, res){
  Post.create(req.body, (err, createdPost)=>{
    res.json(createdPost);
  });
});

//update route
router.put('/:id', function(req, res){
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost)=> {
      res.json(updatedPost)
  });
});

//delete route
router.delete('/:id', function(req, res){
  Post.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
        res.json(deletedPost);
      })
});

module.exports = router;
