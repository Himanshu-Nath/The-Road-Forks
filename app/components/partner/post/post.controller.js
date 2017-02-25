angular.module('trfApp')

.controller('PartnerPostController', ['$state', 'localStorageService', 'PartnerPostService', '$window', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, PartnerPostService, $window, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
      PartnerPostService.getAllTrips()
        .then(function(response) {
              if (response.data.result != undefined) {
                angular.forEach(response.data.result, function(value, key) {
                  var diffDays = Math.round(Math.abs((firstDate.getTime() - new Date(value.dop).getTime())/(oneDay)));
                  value.dayOP = diffDays;                  
                  vm.allTrips = response.data.result;
                });                
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
        },
      function(error) {});

        vm.reportPost = function(id){     
        PartnerPostService.reportPost(vm.user, id)
          .then(function(response) {
                if (response.data.result != undefined) {
                    swal("Success", "Report Posted Successfully", "success");
                  console.log(vm.allTrips);                  
                } else {
                    swal("Fail", "Report Posted Failed", "error");
                }
          },
        function(error) {});
      }

      vm.likePost = function(id){     
        PartnerPostService.likePost(vm.user, id)
          .then(function(response) {
                if (response.data.result != undefined) {
                    swal("Success", "Liked Successfully", "success");
                  console.log(vm.allTrips);                  
                } else {
                    swal("Fail", "Liked Failed", "error");
                }
          },
        function(error) {});
      }

      vm.newPost = function(id){
        $state.go('client.home.newPost');
      }

      vm.openProfile = function(id){
        $state.go('client.home.clickProfile', {'profileId' : id});
      }

    }  else {
      $state.go('login.signin');
    } 
  }
]);