angular.module('trfApp')

.controller('JoinTripModalController', ['$uibModalInstance', 'ModalPopUpService',
	function($uibModalInstance, ModalPopUpService) {
	var vm = this;

	vm.joinTrip= function() {
		ModalPopUpService.joinTrip(vm.join).then(
				function(response) {
					console.log("resource created")
				}, function(error) {});
		$uibModalInstance.dismiss('Resource created successfully');
	}

}]);


