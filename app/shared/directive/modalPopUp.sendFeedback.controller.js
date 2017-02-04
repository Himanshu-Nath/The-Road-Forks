angular.module('trfApp')

.controller('FeedModalController', ['$uibModalInstance', 'ModalPopUpService',
	function($uibModalInstance, ModalPopUpService) {
	var vm = this;

	vm.sendFeedback= function() {
		ModalPopUpService.sendFeedback(vm.feed).then(
				function(response) {
					console.log("resource created")
				}, function(error) {});
		$uibModalInstance.dismiss('Resource created successfully');
	}

}]);


