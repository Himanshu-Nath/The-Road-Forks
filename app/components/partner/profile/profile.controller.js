angular.module('trfApp')

.controller('ProfilePostController', ['$state', 'localStorageService', 'ProfilePostService', '$stateParams', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, ProfilePostService, $stateParams, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    var loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
        ProfilePostService.getProfile(loginUserInfo.id)
          .then(function(response) {
            console.log(response);
                if (response.data.result != undefined) {
                                                                       
                } else {
                    swal("Fail", "Faild To Fetch Profile Details", "error");
                }
          },
        function(error) {});
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
      vm.eraseFind = function() {
        vm.searchedTrip = null;
      }
    }  else {
      $state.go('login.signin');
    }
  }
]);