angular.module('trfApp')

.controller('CommentController', ['$uibModalInstance', 'ModalPopUpService',
	function($uibModalInstance, modalPopUpService) {
	var vm = this;

	/**
	 * Request create comment
	 */
	vm.addComment= function() {
		ModalPopUpService.addComment(vm.comment).then(
				function(response) {
					console.log("resource created")
				}, function(error) {});
		$uibModalInstance.dismiss('Resource created successfully');
	}

}]);


