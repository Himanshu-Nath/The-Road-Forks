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
                } else {
                    swal("Fail", "Faild To Fetch Profile Details", "error");
                }
          },
        function(error) {});

        vm.sendFriendRequest = function(){
          var sendRequestData = {};
          sendRequestData.to = $stateParams.profileId;
          sendRequestData.from = loginUserInfo.id;
          sendRequestData.date = new Date();
          sendRequestData.status = "Pending";
          sendRequestData.name = loginUserInfo.firstname + " " + loginUserInfo.lastname;
          sendRequestData.image = loginUserInfo.image;
          ClickUserProfileService.sendFriendRequest(sendRequestData)
          .then(function(response) {            
                if (response.data.status == true) {                    
                    swal({ title: "Success", text: "Friend Request Send", timer: 2000, showConfirmButton: false });
                } else if (response.data.status == false) {                    
                    swal({ title: "Error", text: "Request Already Sended Before!", timer: 2000, showConfirmButton: false });
                } else {
                    swal("Fail", "Failed To Send Friend Request", "error");
                }
          },
          function(error) {});
        }

        vm.sendMessage = function(){

          swal({
            title: "Your Message!",
            text: "Write something interesting:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write your message here.."
          },
          function(inputValue){
            if (inputValue === false) return false;
            
            if (inputValue === "") {
              swal.showInputError("You need to write something!");
              return false
            }
            var sendMessageData = {};
            sendMessageData.to = $stateParams.profileId;
            sendMessageData.from = loginUserInfo.id;
            sendMessageData.date = new Date();
            sendMessageData.direction = ">";
            sendMessageData.message = inputValue;
            sendMessageData.name = loginUserInfo.firstname + " " + loginUserInfo.lastname;
            sendMessageData.image = loginUserInfo.image;
            ClickUserProfileService.sendMessage(sendMessageData)
            .then(function(response) {            
                  if (response.data.status == true) {                    
                      // swal({ title: "Success", text: "Friend Request Send", timer: 2000, showConfirmButton: false });
                      swal("Nice!", "You wrote: " + inputValue, "success");
                      
                  } else {
                      swal("Fail", "Failed To Send Friend Request", "error");
                  }
            },
            function(error) {});
            // swal("Nice!", "You wrote: " + inputValue, "success");
          });
      
        }

    }  else {
      $state.go('login.signin');
    }
  }
]);