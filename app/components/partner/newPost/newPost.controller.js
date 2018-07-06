angular.module('trfApp')

.controller('PartnerNewPostController', ['$scope', '$state', 'localStorageService', 'PartnerNewPostService', 'ConstantService', 'Upload', 'URL', 'appConfig',
  function($scope, $state, localStorageService, PartnerNewPostService, ConstantService, Upload, URL, appConfig) {

    var vm = this;
    vm.logoURL = URL.logo_images;
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
      vm.newTripPlan = function(){    
        vm.trip.id = vm.loginUserInfo.id;
        vm.trip.fullName = vm.loginUserInfo.firstname+' '+vm.loginUserInfo.lastname;
        vm.trip.image = vm.loginUserInfo.image;
        vm.trip.email = vm.loginUserInfo.email;
        vm.trip.mobile = vm.loginUserInfo.mobile;
        PartnerNewPostService.newTripPlan(vm.trip)
          .then(function(response) {
                if (response.data.result != undefined) {
                    uploadImage(vm.file);
                    // swal("Success", "Report Posted Successfully", "success");                 
                } else {
                    swal("Fail", "New Trip Post Adding Failed", "error");
                }
                $state.go('client.home.post');
          },
        function(error) {});
      }
    }  else {
      $state.go('login.signin');
    }

    var uploadImage = function (file) {
        Upload.upload({
            url: appConfig.serviceUrl + '/trf/api/post/addPostImage',
            data:{file:file}
        }).then(function (resp) {
            if(resp.data.status == true){
                swal("Success", "New Trip Post Is Added", "success");
            } else {
                swal("Fail", "Failed to add trip image", "error")
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
        });
    }

    if(ConstantService.getSessionStatus()){
      vm.back = function(){     
        $state.go('client.home.post');
      }
    }  else {
      $state.go('login.signin');
    }
    
  }
]);