angular.module('trfApp')

.factory('UserEditProfileService', ['$http', '$q', '$rootScope', 'appConfig',
function($http, $q, $rootScope, appConfig) {    
    var UserEditProfileService = {};

     UserEditProfileService.editProfile = function(edit) {
        var deferred = $q.defer();
        $http.post(appConfig.serviceUrl + '/trf/api/profile/edit', edit)
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

     UserEditProfileService.removeImage = function(removeImageData) {
        var deferred = $q.defer();
        $http.post(appConfig.serviceUrl + '/trf/api/removeImage', removeImageData)
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

    return UserEditProfileService;
  }
]);