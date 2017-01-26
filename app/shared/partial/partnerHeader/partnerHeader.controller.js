angular.module('trfApp')

//=========================================================================
//Login header controller 
//=========================================================================

.controller('PartnerHeaderController', ['$scope', 'PartnerHeaderService', 'localStorageService',
function($scope, PartnerHeaderService, localStorageService) {

  var vm = this;  
  vm.heading = "Categories";

}])
