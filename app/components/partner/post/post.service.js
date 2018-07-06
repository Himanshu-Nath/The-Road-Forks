angular.module('trfApp')

.factory('PartnerPostService', ['$http', '$q', '$rootScope', 'appConfig',
function($http, $q, $rootScope, appConfig) {    
    var PartnerPostService = {};

     PartnerPostService.getAllTrips = function() {
        var deferred = $q.defer();
        $http.get(appConfig.serviceUrl + '/trf/api/post/allTrips')
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

      PartnerPostService.reportPost = function() {
        var deferred = $q.defer();
        $http.get(appConfig.serviceUrl + '/trf/api/post/report')
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

      PartnerPostService.likePost = function() {
        var deferred = $q.defer();
        $http.get(appConfig.serviceUrl + '/trf/api/post/like')
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
      
    return PartnerPostService;
  }
]);