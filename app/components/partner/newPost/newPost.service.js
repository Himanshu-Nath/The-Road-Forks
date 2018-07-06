angular.module('trfApp')

.factory('PartnerNewPostService', ['$http', '$q', '$rootScope', 'appConfig',
function($http, $q, $rootScope, appConfig) {    
    var PartnerNewPostService = {};

    PartnerNewPostService.newTripPlan =  function(user){
        var deferred = $q.defer();
        $http.post(appConfig.serviceUrl + '/trf/api/post/newTrip', user)
        .then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(response) {
          console.log("Some error occur");
          console.log(response);
          deferred.reject("Error");
        });
        return deferred.promise;
        }
    return PartnerNewPostService;
  }
]);