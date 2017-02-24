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
              console.log(response);
                  if (response.data.status == true) { 
                      swal("Success", "Profile Updated Successfully", "success");
                  } else {
                      swal("Fail", "Failed To Update Profile Details", "error");
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

      vm.removeImage = function(){
        var removeData = {};
        if(loginUserInfo.gender == "Male")
          removeData.imageName  = "boy.jpg";
        else if(loginUserInfo.gender == "Female")
          removeData.imageName  = "girl.jpg";
        removeData.userId = loginUserInfo.id;
        UserEditProfileService.removeImage(removeData)
          .then(function(response) {
                if(response.data.status == true) {
                      vm.edit.image = removeData.imageName;
                      loginUserInfo.image = removeData.imageName;
                      $rootScope.userImage = removeData.imageName;
                      localStorageService.set('userInfo', loginUserInfo);
                    } else {
                    swal("Fail", "Failed To Remove Image", "error");
                }
          },
        function(error) {});
      }

    }  else {
      $state.go('login.signin');
    }
  }
]);