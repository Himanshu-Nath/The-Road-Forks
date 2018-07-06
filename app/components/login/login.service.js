angular.module('trfApp')

.factory('LoginService', ['$http', '$q', '$rootScope', 'AuthenticationService', 'localStorageService', 'appConfig',
function($http, $q, $rootScope, AuthenticationService, localStorageService, appConfig) {    
    var LoginService = {};

    LoginService.login = function(user) {
        var deferred = $q.defer();
        user.token = AuthenticationService.authToken(user.username, user.password);
    	$http.post(appConfig.serviceUrl + '/trf/api/login', user)
    		.then(function successCallback(response) {
                if(response.data.status == true) 
                    deferred.resolve(response);
                else
                    deferred.resolve(response);
    		}, function errorCallback(response) {
    			deferred.reject("Error");
    		});
    	return deferred.promise;
      }

      LoginService.isLogin = function () {
			return localStorageService.get("userInfo");
		};
    return LoginService;
  }
]);