var app = angular.module('myApp', ['ng-route'])

app.config(function($routeProvider, $httpProvder){
  $httpProvider
  .when('/', {
    templateUrl: 'index.html',
    controller: 'addStudentController',
    restricted: true,
    preventLoggedIn: false
  })
  .when('/register', {
    templateUrl: './templates/signup.html',
    controller: 'signupController',
    restricted: false,
    preventLoggedIn: true
  })
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'loginController',
    restricted: false,
    preventLoggedIn: true
  })
  .when('/logout', {
    restricted: false,
    preventLoggedIn: false,
    resolve: {
      test: function(authService, $location){
      authService.logout();
      $location.path('/login');
      }
    }
  })
  .otherwise({redirectTo: '/login'});
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function($rootScope, $location, $window, authService){
  // check if the token
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    // id restricted and no token
    if(next.restricted && !$window.localStorage.getItem('token')){
      $location.path('/login');
    };
      // something to happen
    // if token and prevent logging in
    if(next.preventLoggedIn && $window.localStorage.getItem('token')){
      $location.path('/');
    }

  });
});