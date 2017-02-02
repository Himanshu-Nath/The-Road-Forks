angular.module('trfApp')
.directive('modalPopUp', [
	function() {
		return {
			scope: {
				comment : '=',
				message : '=',
				join : '='
			},
			restrict : "E",
			templateUrl : 'app/shared/directive/modalPopUp.view.html',

			// This controller is for modalPopUp 
			controller: function ($scope, $element, $attrs, $location, $uibModal) {
				
				$scope.commentPopUp = function(){	
					$uibModal.open({
						controller : 'CommentModalController as CMController',
						templateUrl : 'comment.html'
					})
				}

				$scope.messagePopUp = function(){	
					$uibModal.open({
						controller : 'MessageModalController as MMController',
						templateUrl : 'message.html'
					})
				}	

				$scope.joinTripPopUp = function(){	
					$uibModal.open({
						controller : 'JoinTripModalController as JTMController',
						templateUrl : 'joinTrip.html'
					})
				}			
			}
		}
	}
])