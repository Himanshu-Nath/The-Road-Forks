angular.module('trfApp')

.controller('UserEditProfileController', ['$rootScope', '$state', 'localStorageService', 'UserEditProfileService', 'UserProfileService', 'ConstantService', 'URL', 'Upload',
  function($rootScope, $state, localStorageService, UserEditProfileService, UserProfileService, ConstantService, URL, Upload) {

    var vm = this;
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    var loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
        UserProfileService.getProfile(loginUserInfo.id)
          .then(function(response) {            
                if (response.data.userData != undefined) {                    
                    vm.edit = response.data.userData;
                    console.log(vm.edit);
                } else {
                    swal("Fail", "Faild To Fetch Profile Details", "error");
                }
          },
        function(error) {});

        vm.editProfile = function(){
        UserEditProfileService.editProfile(vm.edit)
          .then(function(response) {            
            console.log(vm.response);
                if (response.data.result != undefined) { 
                    
                } else {
                    swal("Fail", "Faild To Fetch Profile Details", "error");
                }
          },
        function(error) {});
      }

      vm.changeImage = function(file){
        if(file != undefined) {          
          Upload.upload({
                  url: 'http://localhost:3001/trf/api/changeImage',
                  data:{file:file, userId: loginUserInfo.id}
              }).then(function (resp) {                    
                    if(resp.data.status == true) {
                      console.log(resp);
                      vm.edit.image = resp.data.name;
                      loginUserInfo.image = resp.data.name;
                      $rootScope.userImage = resp.data.name;
                      localStorageService.set('userInfo', loginUserInfo);
                    }
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
              });
        }
      }

    }  else {
      $state.go('login.signin');
    }
  }
]);