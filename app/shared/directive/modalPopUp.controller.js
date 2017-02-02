angular.module('trfApp')
.directive('modalPopUp', [
	function() {
		return {
			scope: {
				offer : '=',
				category : '=',
				project : '@projectId',
				terms : '@termsConditions'
			},
			restrict : "E",
			templateUrl : 'app/shared/directive/modalPopUp.view.html',

			// This controller is for modalPopUp 
			controller: function ($scope, $element, $attrs, $location, $uibModal) {
				
				$scope.createComment = function(){	
					$uibModal.open({
						controller : 'CommentController as CController',
						templateUrl : 'comment.html'
					})
				}//end of terms and condition
				
			}
		}
	}
	])