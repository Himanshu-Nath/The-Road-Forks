angular.module('trfApp')

.factory('ConstantService', ['$http', '$q', '$rootScope', 'localStorageService', 
function($http, $q, $rootScope, localStorageService) {    
    var ConstantService = {};
    var loginUserInfo = localStorageService.get('userInfo');

     ConstantService.getSessionStatus = function(){      
      if(loginUserInfo.token.length != 0)
        return true;
      else
        return false;
    }

    return ConstantService;
  }
]);