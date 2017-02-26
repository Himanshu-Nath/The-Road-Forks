angular.module('trfApp')

.factory('ClickUserProfileService', ['$http', '$q', '$rootScope', 
function($http, $q, $rootScope) {    
    var ClickUserProfileService = {};

     ClickUserProfileService.sendFriendRequest = function(sendRequestData) {
        var deferred = $q.defer();
        $http.post('/trf/api/send/freindRequest', sendRequestData)
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

     ClickUserProfileService.sendMessage = function(sendMessageData) {
        var deferred = $q.defer();
        $http.post('/trf/api/send/message', sendMessageData)
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

    return ClickUserProfileService;
  }
]);