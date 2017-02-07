angular.module('trfApp')

.controller('PartnerHomeController', ['$state', '$scope', 'localStorageService', 'PartnerHomeService', '$location', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, $scope, localStorageService, PartnerHomeService, $location, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;

    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
  };

  }
]);