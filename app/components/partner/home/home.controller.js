angular.module('trfApp')

.controller('PartnerHomeController', ['$state', 'localStorageService', 'PartnerHomeService', '$window', 'QUERY_QUESTIONS', 'ConstantService', 'URL',
  function($state, localStorageService, PartnerHomeService, $window, QUERY_QUESTIONS, ConstantService, URL) {

    var vm = this;

    vm.uploadURL = URL.profile_images;
    vm.logoURL = URL.logo_images;
    vm.loginUserInfo = localStorageService.get('userInfo');

  }
]);