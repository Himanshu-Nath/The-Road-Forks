angular.module('trfApp')

.controller('PartnerHomeController', ['$state', 'localStorageService', 'PartnerHomeService', '$window', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, PartnerHomeService, $window, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){     
      PartnerHomeService.getAllTrips(vm.user)
        .then(function(response) {
              if (response.data.result != undefined) {
                angular.forEach(response.data.result, function(value, key) {
                  var diffDays = Math.round(Math.abs((firstDate.getTime() - new Date(value.dop).getTime())/(oneDay)));
                  value.dayOP = diffDays;                  
                  vm.allTrips = response.data.result;
                });
                console.log(vm.allTrips);                  
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
        },
      function(error) {});
    }

    if(ConstantService.getSessionStatus()){
      vm.reportPost = function(id){     
        PartnerHomeService.reportPost(vm.user, id)
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
    }  

    if(ConstantService.getSessionStatus()){
      vm.likePost = function(id){     
        PartnerHomeService.likePost(vm.user, id)
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
    }   

  }
]);