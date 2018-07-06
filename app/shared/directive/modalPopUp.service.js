angular.module('trfApp')

.factory('ModalPopUpService', ['$q', '$http', 'appConfig',
	function($q, $http, appConfig) {
		var ModalPopUpService = {};
		
		ModalPopUpService.addComment = function(resource) {
			var deferred = $q.defer();			
			$http.post(appConfig.serviceUrl + '/trf/api/post/comment', resource)
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
			$http.post(appConfig.serviceUrl + '/trf/api/post/sendMessage', resource)
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
			$http.post(appConfig.serviceUrl + '/trf/api/trip/joinTrip', resource)
			.then(function successCallback(response) {
			deferred.resolve(response.data);
			}, function errorCallback(response) {
				console.log(response);
				deferred.reject("Error");
			});			
				return deferred.promise;
		}

		ModalPopUpService.sendFeedback = function(resource) {
			var deferred = $q.defer();			
			$http.post(appConfig.serviceUrl + '/trf/api/trip/feedback', resource)
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