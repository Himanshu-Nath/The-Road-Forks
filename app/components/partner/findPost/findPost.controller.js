angular.module('trfApp')

.controller('FindYourPostController', ['$state', 'localStorageService', 'FindYourPostService', '$stateParams', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, FindYourPostService, $stateParams, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    vm.find = {};
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

    if(ConstantService.getSessionStatus()){
      vm.findPlace = function(find) {
        vm.findCollapsed = !vm.findCollapsed;
        FindYourPostService.findPlace(find)
          .then(function(response) {
                if (response.data.result != undefined) {
                  angular.forEach(response.data.result, function(value, key) {
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - new Date(value.dop).getTime())/(oneDay)));
                    value.dayOP = diffDays;                  
                    vm.searchedTrip = response.data.result; 
                  });                                                       
                } else if(response.data.result == undefined) {
                    swal("Oops! No Post Here", "Try Again!, with different loaction", "error");
                } else {
                    swal("Fail", "Faild To Fetch Trips Details", "error");
                }
          },
        function(error) {});
      }

      vm.findPlaceById = function(id) {
        FindYourPostService.findPlaceById(id)
          .then(function(response) {
                if (response.data.result != undefined) {
                  angular.forEach(response.data.result, function(value, key) {
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - new Date(value.dop).getTime())/(oneDay)));
                    value.dayOP = diffDays;                  
                    vm.searchedTrip = response.data.result; 
                    vm.trip = response.data.result[0];
                    vm.find.place = response.data.result[0].place;
                  });                                                       
                } else if(response.data.result == undefined) {
                    swal("Oops! No Post Here", "Try Again!, with different loaction", "error");
                } else {
                    swal("Fail", "Faild To Fetch Trips Details", "error");
                }
          },
        function(error) {});
      }

      if($stateParams.postId.length != 0){
        console.log($stateParams.postId);
        vm.findPlaceById($stateParams.postId);
        vm.findCollapsed = !vm.findCollapsed;
      }

      vm.idSelectedVote = null;
      vm.setSelected = function(idSelectedVote){
        vm.idSelectedVote = idSelectedVote;
      }

      vm.openProfile = function(id){
        $state.go('client.home.clickProfile', {'profileId' : id});
      }
      
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

    if(ConstantService.getSessionStatus()){
        vm.changePostStatus = function(status,id) {
          var postStatus = {};
          if(status == "open"){
            postStatus.status = "close";
          } else {
            postStatus.status = "open";
          }
          postStatus.id = id;
        FindYourPostService.changePostStatus(postStatus)
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