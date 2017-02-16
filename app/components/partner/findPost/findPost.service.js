angular.module('trfApp')

.factory('FindYourPostService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var FindYourPostService = {};

     FindYourPostService.findPlace = function(find) {
        var deferred = $q.defer();
        $http.get('/trf/api/post/findTrip/'+find.place.toLowerCase())
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

      FindYourPostService.findPlaceById = function(id) {
        var deferred = $q.defer();
        $http.get('/trf/api/post/placeById/'+id)
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

      FindYourPostService.changePostStatus = function(postStatus) {
        var deferred = $q.defer();
        $http.post('/trf/api/post/status', postStatus)
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
            
    return FindYourPostService;
  }
]);