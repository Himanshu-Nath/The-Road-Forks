angular.module('trfApp')

.controller('RegistrationController', ['$state', 'localStorageService', 'RegistrationService', 'FlashService', '$window',
  function($state, localStorageService, LoginService, FlashService, $window) {

    var vm = this;
    vm.questionList = ["Your First School Name ?", "Your First Pet Name ?", "Your Nick Name ?",
    "Your Current Bike Number ?", "Your Graduation Percentage ?", "Your First Boss Name ?", "Your Father Last Name ?"]

    
  }
]);