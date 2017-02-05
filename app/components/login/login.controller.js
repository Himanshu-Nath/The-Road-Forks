angular.module('trfApp')

.controller('LoginController', ['$state', 'localStorageService', 'LoginService', 'FlashService', '$window',
  function($state, localStorageService, LoginService, FlashService, $window) {

    var vm = this;

    vm.login = function() {               
        LoginService.login(vm.user)
        	.then(function(response) {
                if (response.data.status) {
                    var userInfo = {
                        'token' : response.data.result.token,
                        'id' : response.data.result._id,
                        'firstname' : response.data.result.firstName,
                        'lastname' : response.data.result.lastName,
                        'image' : response.data.result.image,
                        'email' : response.data.result.email,
                        'username' : response.data.result.username,
                        'mobile' : response.data.result.mobile
                    }
                    localStorageService.set('userInfo', userInfo);
                    $state.go('client.home.post');
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