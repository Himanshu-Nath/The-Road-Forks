angular.module('trfApp')

.factory('PartnerYourPostService', ['$http', '$q', '$rootScope', 'appConfig',
function($http, $q, $rootScope, appConfig) {    
    var PartnerYourPostService = {};

     PartnerYourPostService.myAllTrips = function(userInfo) {
        var deferred = $q.defer();
        $http.get(appConfig.serviceUrl + '/trf/api/post/myTrip/'+userInfo.id)
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

      PartnerYourPostService.changePostStatus = function(postStatus) {
        var deferred = $q.defer();
        $http.post(appConfig.serviceUrl + '/trf/api/post/status', postStatus)
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
            
    return PartnerYourPostService;
  }
]);