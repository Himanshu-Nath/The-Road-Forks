angular.module('trfApp')

.controller('LoginController', ['$state', 'localStorageService', 'LoginService', 'FlashService', '$window',
  function($state, localStorageService, LoginService, FlashService, $window) {

    var vm = this;

    vm.login = function() {        
        LoginService.login(vm.login)
        	.then(function(response) {
                if (response.success) {
                    //localStorageService.set("CurrentUserToken", response.token);
                    $window.localStorage.setItem('CurrentUserToken', response.token);
                    localStorageService.set('CurrentUserId', response.id);
                    $window.localStorage.setItem('CurrentUserName', response.firstName);
                    $state.go('home.dashboard');
                } else {
                    FlashService.error(response.message);
                    vm.dataLoading = false;
                }
          },
        function(error) {});
    }

    vm.registration = function(){
        $state.go('login.registration');
    }
    vm.forgotPassword = function(){
        $state.go('login.forgotPassword');
    }
  }
]);