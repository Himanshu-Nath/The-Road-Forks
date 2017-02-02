angular.module('trfApp')

.controller('MessageModalController', ['$uibModalInstance', 'ModalPopUpService',
	function($uibModalInstance, ModalPopUpService) {
	var vm = this;

	/**
	 * Request create comment
	 */
	vm.sendMessage= function() {
		ModalPopUpService.sendMessage(vm.message).then(
				function(response) {
					console.log("resource created")
				}, function(error) {});
		$uibModalInstance.dismiss('Resource created successfully');
	}

}]);


