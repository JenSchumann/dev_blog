const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.js');
const bcrypt = require('bcryptjs');

//index route to all admin // in case I end up having guest blog writers in the future
router.get('/', (req, res)=> {
  Admin.find({}, (err, foundAdmins)=> {
    res.json(foundAdmins);
  });
});

//login verification route
router.get('/verifyLogin', (req, res)=> {
  if(req.session.logged) {
    Admin.findOne({ username: req.session.username}, (err, admin)=> {
      res.json(admin)
    });
  } else {
          req.session.message = "Username or Password are incorrect";
          res.json(req.session.message)
  };
});

//register new admin - post route
router.post('/register', (req, res)=>{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const adminDbEntry = {};
  adminDbEntry.username = req.body.username;
  adminDbEntry.password = passwordHash;
  Admin.create(adminDbEntry, (err, admin)=> {
    req.session.message = '';
    req.session.username = admin.username;
    req.session.logged = true;
    res.json(req.session.logged);
  });
});

//login admin - post route
router.post('/login', (req, res)=> {
  Admin.findOne({ username: req.body.username }, (err, admin)=> {
    if(admin){
      if(bcrypt.compareSync(req.body.password, admin.password)){
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        res.json(req.session.logged);
      } else {
        req.session.message = "Incorrect Username &/or Password";
        res.json(req.session.message);
      }
    } else {
      req.session.message = "Incorrect Username &/or Password";
      res.json(req.session.message);
    }
  });
});

//logout user route
router.get('/logout', (req, res)=> {
  req.session.destroy(function(err){
    req.session = false;
    console.log('User Logged Out');
    res.json(req.session);
  });
});

//show route.... need to figure out admin will "see" their profile ==> user icon on nav if logged in leads to admin modal? tied to a profile schema?
router.get('/:id', (req, res)=> {
  Admin.find({ _id: req.params.id }, function(err, foundAdmin)
  {
    res.json(foundAdmin)
  });
});

//edit route
router.get('/verifyLogin', (req, res)=> {
  if(req.session.logged){
    Admin.findOne({ username: req.session.username }, (err, admin)=> {
      res.json(updatedAdmin);
    });
  } else {
    console.log('get route to verifyLogin for edit');
  };
});

// need to verify that this is working properly... admin profile as a separate model may make this redundant
router.put('/:verifyLogin', (req, res)=> {
  if(req.session.logged){
    Admin.findByIdAndUpdate(req.params.id, req.body, { new: true },
    (err, admin)=> {
      console.log('updated admin profile');
      res.json(updatedAdmin);
    });
  } else {
    res.send('error');
    console.log('error in put/:verifyLogin');
  };
});

//delete user route
router.delete('/:id', (req, res)=> {
  Admin.findByIdAndRemove(req.params.id, (err, deletedAdmin)=> {
    res.json(deletedAdmin);
  });
});


module.exports = router;
