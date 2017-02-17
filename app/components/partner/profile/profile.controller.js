angular.module('trfApp')

.controller('UserProfileController', ['$state', 'localStorageService', 'UserProfileService', '$stateParams', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, UserProfileService, $stateParams, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    var loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
        UserProfileService.getProfile(loginUserInfo.id)
          .then(function(response) {            
                if (response.data.userData != undefined) {                    
                    vm.profile = response.data.userData;
                    console.log(vm.profile);
                } else {
                    swal("Fail", "Faild To Fetch Profile Details", "error");
                }
          },
        function(error) {});
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
      vm.eraseFind = function() {
        vm.searchedTrip = null;
      }
    }  else {
      $state.go('login.signin');
    }
  }
]);