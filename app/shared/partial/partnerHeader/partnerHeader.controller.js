angular.module('trfApp')

//=========================================================================
//Login header controller 
//=========================================================================

.controller('PartnerHeaderController', ['$scope', 'PartnerHeaderService', '$location',
function($scope, PartnerHeaderService, $location) {

  var vm = this;  
  vm.heading = "Categories";

  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
  };

}])
