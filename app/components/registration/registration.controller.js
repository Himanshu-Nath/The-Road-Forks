angular.module('trfApp')

.controller('RegistrationController', ['$state', 'localStorageService', 'RegistrationService', 'FlashService', '$window', 'QUERY_QUESTIONS', 'Upload',
  function($state, localStorageService, RegistrationService, FlashService, $window, QUERY_QUESTIONS, Upload) {

    var vm = this;
    vm.questionList = QUERY_QUESTIONS.questionList;

    vm.register = function(){
        vm.user.profilePicName = vm.file.name;
        RegistrationService.registerUser(vm.user)
        .then(function(response) {
          if(response.data.status == true) {
            uploadImage(vm.file, response.data.playerId, vm.file.name);
            // swal("Success", "User is registered", "success");
          }
          else
            swal("Fail", "Error is user registration", "error")
          $state.go('login.signin');
        },
        function(error) {
          swal("Error", "Error "+error, "error")
        });
    }    

    var uploadImage = function (file) {
        Upload.upload({
            url: 'http://localhost:3001/trf/api/uploadImage',
            data:{file:file}
        }).then(function (resp) {
          console.log(resp);
            if(resp.data.status == true){
                swal("Success", "User is registered", "success");
            } else {
                swal("Fail", "Failed to upload Profile Image", "error")
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
        });
    }
  }
]);