angular.module('trfApp')

.controller('ForgotPasswordController', ['$state', 'localStorageService', 'ForgotPasswordService', 'FlashService', '$window', 'QUERY_QUESTIONS',
  function($state, localStorageService, ForgotPasswordService, FlashService, $window, QUERY_QUESTIONS) {

    var vm = this;
    vm.questionList = QUERY_QUESTIONS.questionList;

    vm.forgotPasswordByQuestions = function(){
        ForgotPasswordService.forgotUserPasswordByQuestions(vm.user)
      .then(function(response) {
        if(response.data.status == true && response.data.user == true) {
            swal("Success", "Your Password is: "+response.data.result.password, "success");
            $state.go('login.signin');
        } else if(response.data.status == false && response.data.user == true)
            swal("Fail", "Wrong Answer ! Try Again", "error");
          else if(response.data.status == false && response.data.user == false)
            swal("Fail", "User Not Exist ! Register Yourself", "error");
      },
      function(error) {
        swal("Error", "Error "+error, "error")
      });
    }

    vm.forgotPasswordByMail = function(){
        ForgotPasswordService.forgotUserPasswordByMail(vm.user)
      .then(function(response) {
        if(response.data.status == true && response.data.user == true) {
          swal("Success", "Password Send To Mail", "success");
          $state.go('login.signin');
        } else if(response.data.status == false && response.data.user == true)
            swal("Fail", "Wrong Credential ! Try Again", "error")
          else if(response.data.status == false && response.data.user == false)
            swal("Fail", "User Not Exist ! Register Yourself", "error")
      },
      function(error) {
        swal("Error", "Error "+error, "error")
      });
    }
    
  }
]);