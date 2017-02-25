angular.module('trfApp')

.controller('ClickUserProfileController', ['$state', 'localStorageService', 'ClickUserProfileService', '$stateParams', 'UserProfileService', 'ConstantService', 'URL',
  function($state, localStorageService, ClickUserProfileService, $stateParams, UserProfileService, ConstantService, URL) {

    var vm = this;
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    var loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
        UserProfileService.getProfile($stateParams.profileId)
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
  }
]);