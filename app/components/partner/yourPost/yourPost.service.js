angular.module('trfApp')

.factory('PartnerYourPostService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var PartnerYourPostService = {};

     PartnerYourPostService.myAllTrips = function(userInfo) {
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

      PartnerYourPostService.changePostStatus = function(postStatus) {
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
            
    return PartnerYourPostService;
  }
]);