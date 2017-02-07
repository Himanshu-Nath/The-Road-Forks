angular.module('trfApp')

.factory('PartnerUpdatePostService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var PartnerUpdatePostService = {};

     PartnerUpdatePostService.myAllTrips = function(userInfo) {
        var deferred = $q.defer();
        $http.get('/trf/api/post/myTrip/'+userInfo.id)
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

      PartnerUpdatePostService.updatePost = function(editedTrip) {
        var deferred = $q.defer();
        $http.post('/trf/api/post/edit', editedTrip)
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

      PartnerUpdatePostService.deletePost = function(id) {
        var deferred = $q.defer();
        $http.put('/trf/api/post/delete/'+id)
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
            
    return PartnerUpdatePostService;
  }
]);