angular.module('trfApp')

.factory('PartnerPostService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var PartnerPostService = {};

     PartnerPostService.getAllTrips = function() {
        var deferred = $q.defer();
        $http.get('/trf/api/allTrips')
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
        $http.get('/trf/api/post/report')
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
        $http.get('/trf/api/post/like')
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