var app = angular.module('myApp', [])

app.service('studentDataService', ['crudService', 
  function(crudService){

  var data = [];

  return {
    getAllStudents: function(){
      return crudService.getAll('students')
      .then(function(students){
        return students;
      });
    },

    addStudent: function(payload){
      crudService.addOne('students', payload)
      .then(function(student) {
        return student;
      })
    }
  };


}])

app.service('crudService', ['$http', function($http){

  return {
    getAll: function(resource){

      return $http.get('/'+resource)
      .then(function(res){
        return res;
      })
      .catch(function(err){
        return err;
      })
    },

    addOne: function(resource, payload) {
      return $http.post('/'+resource, payload)
      .then(function(res){
        return res;
      })
      .catch(function(err){
        return err;
      })
    } 
  };
}])

// 1. login
// 2. logout
// 3. register
// 4. set user info in localstorage
// 5. get user info from localstorage

app.service('authService', ['$http', '$window', function($http, $window){
  var user = {};
  return {
    login: function(user){
      return $http.post('/auth/login', user);
    },
    logout: function(user){
      user = null;
      $window.localStorage.clear();
    },
    register: function(user){
      return $http.post('auth/login', user);
    },
    setUserInfo: function(userData){
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', userData.data.data.token);
    },
    getUserInfo: function(userData){
      $window.localStorage.getItem('user');
    },
  };
}]);

app.service('authInterceptor', [function(){
  return {
    request: function(config){
     // config.headers['X-requested-with'] = XMLHttpRequest;
      var token = $window.localStorage.getItem('token');
      if(token){
        config.headers.Authorization = "Bearer" + token;
       // retun $q.resolve(config);
      }
    },
    responseError: function(err){
      return err;
    }
  };
}]);