var app = angular.module('myApp', []);

app.controller('myController', ['$scope', function($scope){
  $scope.greeting = "yay";
}])