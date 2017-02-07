angular.module('trfApp')

.controller('PartnerYourPostController', ['$state', 'localStorageService', 'PartnerYourPostService', '$window', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, PartnerYourPostService, $window, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
      PartnerYourPostService.myAllTrips(vm.loginUserInfo)
        .then(function(response) {
              if (response.data.result != undefined) {
                angular.forEach(response.data.result, function(value, key) {
                  var diffDays = Math.round(Math.abs((firstDate.getTime() - new Date(value.dop).getTime())/(oneDay)));
                  value.dayOP = diffDays;
                  vm.myTrips = response.data.result;                  
                });                
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
        },
      function(error) {});
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
        vm.changePostStatus = function(status,id) {
          var postStatus = {};
          if(status == "open"){
            postStatus.status = "close";
          } else {
            postStatus.status = "open";
          }
          postStatus.id = id;
        PartnerYourPostService.changePostStatus(postStatus)
          .then(function(response) {
                if (response.data.result != undefined) {
                  console.log("Post Status Changed");
                } else {
                    swal("Fail", "Faild To Fetch Trips Details", "error");
                }
          },
        function(error) {});
      }  
    }else {
      $state.go('login.signin');
    }

  }
]);