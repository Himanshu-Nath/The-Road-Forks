angular.module('trfApp')

.controller('ForgotPasswordController', ['$state', 'localStorageService', 'ForgotPasswordService', 'FlashService', '$window', 'QUERY_QUESTIONS',
  function($state, localStorageService, ForgotPasswordService, FlashService, $window, QUERY_QUESTIONS) {

    var vm = this;
    vm.questionList = QUERY_QUESTIONS.questionList;

    vm.forgotPassword = function(){
        ForgotPasswordService.forgotUserPassword(vm.user)
      .then(function(response) {
        if(response.data.status == true) 
          swal("Success", "Password Send To Mail", "success");
        else
          swal("Fail", "Error To Send Password To Mail", "error")
        $state.go('login.signin');
      },
      function(error) {
        swal("Error", "Error "+error, "error")
      });
    }
    
  }
]);