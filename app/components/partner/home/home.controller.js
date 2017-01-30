angular.module('trfApp')

.controller('PartnerHomeController', ['$state', 'localStorageService', 'PartnerHomeService', '$window', 'QUERY_QUESTIONS', 'ConstantService',
  function($state, localStorageService, PartnerHomeService, $window, QUERY_QUESTIONS, ConstantService) {

    var vm = this;
    var loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){     
      PartnerHomeService.getAllTrips(vm.user)
        .then(function(response) {
              console.log(response)
              if (response.data.result != undefined) {
                  vm.allTrips = response.data.result;
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
        },
      function(error) {});
    }
    
  }
]);