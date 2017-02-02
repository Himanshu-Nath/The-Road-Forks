angular.module('trfApp')

.factory('ModalPopUpService', ['$q', '$http',
	function($q, $http) {
		var ModalPopUpService = {};
		
		ModalPopUpService.addComment = function(resource) {
			var deferred = $q.defer();
			
	    	$http.post('/trf/api/post/comment', resource)
    		.then(function successCallback(response) {
                deferred.resolve(response.data);
    		}, function errorCallback(response) {
    			console.log(response);
    			deferred.reject("Error");
    		});			
			return deferred.promise;
		}

		ModalPopUpService.sendMessage = function(resource) {
			var deferred = $q.defer();
			
	    	$http.post('/trf/api/post/sendMessage', resource)
    		.then(function successCallback(response) {
                deferred.resolve(response.data);
    		}, function errorCallback(response) {
    			console.log(response);
    			deferred.reject("Error");
    		});			
			return deferred.promise;
		}

		ModalPopUpService.joinTrip = function(resource) {
			var deferred = $q.defer();
			
	    	$http.post('/trf/api/trip/joinTrip', resource)
    		.then(function successCallback(response) {
                deferred.resolve(response.data);
    		}, function errorCallback(response) {
    			console.log(response);
    			deferred.reject("Error");
    		});			
			return deferred.promise;
		}
		return ModalPopUpService;
	}
])