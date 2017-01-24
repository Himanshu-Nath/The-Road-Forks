angular.module('trfApp')

.controller('RegistrationController', ['$state', 'localStorageService', 'RegistrationService', 'FlashService', '$window', 'QUERY_QUESTIONS',
  function($state, localStorageService, RegistrationService, FlashService, $window, QUERY_QUESTIONS) {

    var vm = this;
    vm.questionList = QUERY_QUESTIONS.questionList;

    vm.register = function(){
        RegistrationService.registerUser(vm.user)
      .then(function(response) {
        if(response.data.status == true) 
          swal("Success", "User is registered", "success");
        else
          swal("Fail", "Error is user registration", "error")
        $state.go('login.signin');
      },
      function(error) {
        swal("Error", "Error "+error, "error")
      });
    }
    
  }
]);