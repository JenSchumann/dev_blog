//dependences
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const env = require('dotenv').config();

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//controllers
const postController = require('./controllers/post.js');
app.use('/post', postController);





//mongoose connection
mongoose.connect('mongodb://localhost:27017/DEVinition');
mongoose.connection.once('open', function(){
  console.log('DEVinition connected to mongoose...');
});


//port
app.listen(3000, function(){
  console.log('DEVinition is listening...');
});
