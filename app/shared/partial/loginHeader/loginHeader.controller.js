angular.module('trfApp')

//=========================================================================
//Login header controller 
//=========================================================================

.controller('LoginHeaderController', ['$scope', 'LoginHeaderService', 'localStorageService',
function($scope, LoginHeaderService, localStorageService) {

  var vm = this;  
  vm.heading = "Categories";

}])
