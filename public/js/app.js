// console.log('new devs have a passion for becoming proficient at their craft');

const app = angular.module('DevApp', []);

////////////////////////////////////////////////////////////

//POST controller

////////////////////////////////////////////////////////////

app.controller('PostController', ['$http', function($http){
  const controller = this;
  this.developed = 'is a sign of fun creativity!';


}]); //end of PostController
