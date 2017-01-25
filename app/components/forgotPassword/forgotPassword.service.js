angular.module('trfApp')

.factory('ForgotPasswordService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var ForgotPasswordService = {};

      ForgotPasswordService.forgotUserPasswordByQuestions =  function(user){
      var deferred = $q.defer();
      $http.post('/trf/api/forgetPasswordByQuestions', user)
      .then(function successCallback(response) {
        deferred.resolve(response);
      }, function errorCallback(response) {
        console.log("Some error occur");
        console.log(response);
        deferred.reject("Error");
      });
      return deferred.promise;
      }

      ForgotPasswordService.forgotUserPasswordByMail =  function(user){
      var deferred = $q.defer();
      $http.post('/trf/api/forgetPasswordByMail', user)
      .then(function successCallback(response) {
        deferred.resolve(response);
      }, function errorCallback(response) {
        console.log("Some error occur");
        console.log(response);
        deferred.reject("Error");
      });
      return deferred.promise;
      }
    return ForgotPasswordService;
  }
]);