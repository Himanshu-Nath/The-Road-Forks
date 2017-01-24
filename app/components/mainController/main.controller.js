angular.module('trfApp')

.controller('MainController', [ '$state', '$rootScope', function( $state, $rootScope ) {
	var vm = this;
	vm.$state = $state;
	return vm;
}
]);
