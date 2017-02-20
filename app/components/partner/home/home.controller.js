angular.module('trfApp')

.controller('PartnerHomeController', ['$rootScope', '$state', '$scope', 'localStorageService', 'PartnerHomeService', '$location', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($rootScope, $state, $scope, localStorageService, PartnerHomeService, $location, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;

    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');
    $rootScope.userImage = vm.loginUserInfo.image;

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
  };

  }
]);