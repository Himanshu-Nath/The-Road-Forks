angular.module('trfApp')

.controller('PartnerUpdatePostController', ['$scope' ,'$state', 'localStorageService', 'PartnerUpdatePostService', '$filter', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($scope, $state, localStorageService, PartnerUpdatePostService, $filter, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    vm.tripImageURL = URL.trip_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

  $scope.today = function() {
  $scope.startDate = new Date();
  $scope.endDate = new Date();
  $scope.dope = new Date();
	};
	$scope.today();

	$scope.inlineOptions = {
			customClass: getDayClass,
			minDate: new Date(),
			showWeeks: true
	};

	$scope.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 12, 31),
			minDate: new Date(2000, 1, 1),
			startingDay: 1
	};

	$scope.popup1 = {
			opened: false
	};

	$scope.popup2 = {
			opened: false
	};

	$scope.popup3 = {
			opened: false
	};

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.open3 = function() {
		$scope.popup3.opened = true;
	};

	$scope.formats = ['MMM dd yyyy'];
	$scope.format = $scope.formats[0];

  function getDayClass(data) {
		var date = data.date,
		mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);
			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
		return '';
	}

    if(ConstantService.getSessionStatus()){
      PartnerUpdatePostService.myAllTrips(vm.loginUserInfo)
        .then(function(response) {
              if (response.data.result != undefined) {
                   angular.forEach(response.data.result, function(value, key) {   
                  value.dayStartDate = new Date(value.startDate);
                  value.dayEndDate = new Date(value.endDate);
                  value.dayDateOfPostEnd = new Date(value.dope);
                  value.tripImage = vm.tripImageURL + value.placeImages;
                  vm.myTrips = response.data.result;
                });                                
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
              console.log(vm.myTrips);
        },
      function(error) {});
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
        vm.saveUpdatedPost = function(editedTrip) {
        PartnerUpdatePostService.saveUpdatedPost(editedTrip)
          .then(function(response) {
                if (response.data.result != undefined) {
                  console.log("Post Deleted Successfully");
                } else {
                    swal("Fail", "Faild To Fetch Trips Details", "error");
                }
          },
        function(error) {});
      }  
    }else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
        vm.deletePost = function(id) {
        PartnerUpdatePostService.deletePost(id)
          .then(function(response) {
                if (response.data.result != undefined) {
                  console.log("Post Deleted Successfully");
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