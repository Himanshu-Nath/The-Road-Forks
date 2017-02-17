angular.module('trfApp')

.factory('UserProfileService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var UserProfileService = {};

     UserProfileService.getProfile = function(id) {
        var deferred = $q.defer();
        $http.get('/trf/api/profile/get/'+id)
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

    return UserProfileService;
  }
]);