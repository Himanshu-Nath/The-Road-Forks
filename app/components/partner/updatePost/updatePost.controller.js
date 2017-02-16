angular.module('trfApp')

.controller('PartnerUpdatePostController', ['$scope' ,'$state', 'localStorageService', 'PartnerUpdatePostService', '$filter', 'QUERY_QUESTIONS', 'ConstantService', 'URL', 'Upload',
  function($scope, $state, localStorageService, PartnerUpdatePostService, $filter, QUERY_QUESTIONS, ConstantService, URL, Upload) {

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
              } else if(response.data.result == undefined) {
                  swal("Their Is No Any Trip Post", "Try Again ! By Adding First Post", "error");
              } else {
                  swal("Fail", "Faild To Fetch Trips Details", "error");
              }
        },
      function(error) {});
    }  else {
      $state.go('login.signin');
    }

    if(ConstantService.getSessionStatus()){
        vm.updatePost = function(editedTrip) {
          if(vm.file != undefined)
            editedTrip.placeImage = vm.file.name;
          console.log(editedTrip);
        PartnerUpdatePostService.updatePost(editedTrip)
          .then(function(response) {
                if (response.data.result != undefined) {
                    // swal("Success", "Trip Post Updated Successfully", "success"); 
                    uploadImage(vm.file);
                } else {
                    swal("Fail", "Faild To Update Trip Post", "error");
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
                    swal("Success", "Post Deleted Successfully", "success");
                    $state.go('client.home.updatePost');
                } else {
                    swal("Fail", "Failed To Delete Post", "error");
                }
          },
        function(error) {});
      }

      vm.openPost = function(id) {
        $state.go('client.home.findPost',{'postId':id});
      }
    }else {
      $state.go('login.signin');
    }

    var uploadImage = function (file) {
        Upload.upload({
            url: 'http://localhost:3001/trf/api/post/addPostImage',
            data:{file:file}
        }).then(function (resp) {
            if(resp.data.status == true){
                swal("Success", "Trip Post Updated Successfully", "success");
                $state.go('client.home.updatePost');
            } else {
                swal("Fail", "Failed to add trip image", "error")
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
        });
    }

  }
]);