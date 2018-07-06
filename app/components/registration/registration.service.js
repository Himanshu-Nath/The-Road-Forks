angular.module('trfApp')

.factory('RegistrationService', ['$http', '$q', '$rootScope', 'AuthenticationService', 'appConfig', 
function($http, $q, $rootScope, AuthenticationService, appConfig) {    
    var RegistrationService = {};

      RegistrationService.registerUser =  function(user){
        var deferred = $q.defer();
        user.token = AuthenticationService.authToken(user.username, user.conformPassword);
        $http.post(appConfig.serviceUrl + '/trf/api/register', user)
        .then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(response) {
          console.log("Some error occur");
          console.log(response);
          deferred.reject("Error");
        });
        return deferred.promise;
        }
    return RegistrationService;
  }
]);