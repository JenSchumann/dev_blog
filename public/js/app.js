// console.log('new devs have a passion for becoming proficient at their craft');

const app = angular.module('DevApp', []);

////////////////////////////////////////////////////////////

//POST controller

////////////////////////////////////////////////////////////

app.controller('PostController', ['$http', function($http){
  const controller = this;
  this.developed = 'is a sign of fun creativity!';


}]); //end of PostController


////////////////////////////////////////////////////////////

//Admin controller

////////////////////////////////////////////////////////////

app.controller('AdminController', ['$http', '$scope', function($http, $scope){
  const controller = this;
  this.message = 'gotta refresh the AngularJS skills'
  this.modal = false;
  this.loggedIn = false;
  this.loginForm = true;
  this.registerForm = false;
  this.newDisplay = false;
  this.currentAdmin = {};


  this.toggleNew = function(){
    this.newDisplay = !this.newDisplay;
    this.reset = function() {
      this.addForm.reset();
    }
  }
  this.toggleModal = function(){
    this.modal = !this.modal;
  };
  this.toggleForms = function(){
    this.registerForm = !this.registerForm;
    this.loginForm = !this.loginForm;
  };

  this.register = function(username, password){
    $http({
      method: 'POST',
      url: '/admin/register',
      data: {
        username: this.registeredUsername,
        password: this.registeredPassword
      }
    }).then(function(response){
      controller.loggedIn = response.data;
      controller.registerForm = false;
      console.log('new ADMIN created');
    }, function(err){
      console.log(err);
    });
  };
  this.goToRegister = function(){
    this.registerForm = true;
    this.loginForm = false;
  };
  this.goToLogin = function(){
    this.loginForm = true;
    this.registerForm = false;
  };
  //ajax call to login
  this.login = function(username, password){
    $http({
      method: 'POST',
      url: '/admin/login',
      data: {
        username: this.loginUsername,
        password: this.loginPassword
      }
    }).then(function(response){
      if(response.data === true){
      controller.loginForm = false;
      controller.loggedIn = response.data;
      controller.verifyLogin();
      console.log('verified ADMIN is logged in');

    } else {
      controller.message = response.data
    };
    }, function(err){
      console.log(err);
    });
  };

  //ajax call to logout a session
  this.logOut = function(){
    $http({
      method: 'GET',
      url: '/admin/logout'
    }).then(function(response){
      controller.loggedIn = response.data;
      controller.loginForm = true;
      controller.username = {};
      console.log('ADMIN logged out');
    });
  };

  //ajax call to show all the ADMINS
  this.getUsers = function(){
    $http({
      method: 'GET',
      url: '/admin'
    }).then(function(response){
      //test this to see if commenting out  controller.allAdmins will stop access of allAdmin in update admin edit route
      controller.allAdmins = response.data;
    }, function(err){
      console.log(err);
    });
  };

  this.verifyLogin = function(){
    $http({
      method: 'GET',
      url: '/admin/verifyLogin'
    }).then(function(response){
      $scope.verifyAdmin = response.data; //this is our current admins

    }, function(err){
      console.log(err);
    });
  };

  //ajax call to identify a certain admin by id
  this.setCurrentAdmin = function(id){
    $http({
      method: 'GET',
      url: '/admin/' + id
    }).then(function(response){
      controller.currentAdmin = response.data[0]
      $scope.input = '';
    }, function(err){
      console.log(err);
    });
  };


  //this is where the issue is:
  //ajax call to update the admin
  this.updateAdmin = function(id){
    console.log('works', id.allAdmins[4]._id);
    // console.log("this is update Admin id", id);

    $http({
      method: 'PUT',
      url: '/admin/' + id.allAdmins[4]._id,
      data: this.editedAdmin
    }).then(function(response){
      controller.getAdmins();
      controller.currentAdmin = {};
      controller.admin = {};
      // adding this to see if I can grab Admin input
      controller.editedAdmin = {};
      // controller.editedAdmin._id = {};
    }, function(err){
      console.log(err);
      // console.log('error in update route');
    });
  };

  //ajax call to delete the Admin
  this.deleteAdmin = function(admin){
    $http({
      method: 'DELETE',
      url: '/admin/' + admin,
    }).then(function(response){
      controller.getAdmins();
      controller.modal = false;
      controller.logOut();
    }, function(err){
      console.log('admin delete route error');
      console.log(err);
    });
  };
  this.getUsers();

}]); //end of AdminController
