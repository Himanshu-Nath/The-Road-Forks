angular.module('trfApp')

.controller('LoginController', ['$state', 'localStorageService', 'LoginService', 'FlashService', '$window',
  function($state, localStorageService, LoginService, FlashService, $window) {

    var vm = this;

    vm.login = function() {               
        LoginService.login(vm.user)
        	.then(function(response) {
                console.log(response)
                if (response.data.status) {
                    var userInfo = {
                        'token' : response.token,
                        'id' : response.id,
                        'firstname' : response.firstName
                    }
                    localStorageService.set('userInfo', userInfo);
                    $state.go('client.home');
                } else {
                    swal("Fail", "Wrong Username And Password", "error");
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