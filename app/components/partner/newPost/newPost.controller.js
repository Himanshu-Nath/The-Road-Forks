angular.module('trfApp')

.controller('PartnerNewPostController', ['$state', 'localStorageService', 'PartnerNewPostService', 'ConstantService', 'Upload',
  function($state, localStorageService, PartnerNewPostService, ConstantService, Upload) {

    var vm = this;
    vm.loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
      vm.newTripPlan = function(){     
        PartnerNewPostService.newTripPlan(vm.trip)
          .then(function(response) {
                if (response.data.result != undefined) {
                    swal("Success", "Report Posted Successfully", "success");
                  console.log(vm.allTrips);                  
                } else {
                    swal("Fail", "Report Posted Failed", "error");
                }
          },
        function(error) {});
      }
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
      vm.back = function(){     
        $state.go('client.home.post');
      }
    }  else {
      $state.go('login.signin');
    }
    
  }
]);