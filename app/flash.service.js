angular.module('trfApp')

.factory('FlashService', ['$rootScope', function($rootScope) {    
    var FlashService = {};
    
    initService();

    function initService() {
        $rootScope.$on('$locationChangeStart', function () {
            clearFlashMessage();
        });

        function clearFlashMessage() {
            var flash = $rootScope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete $rootScope.flash;
                } else {
                    // only keep for a single location change
                    flash.keepAfterLocationChange = false;
                }
            }
        }
    }

    FlashService.success = function(message, keepAfterLocationChange) {
    	$rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
        };
    }
    
    FlashService.error = function(message, keepAfterLocationChange) {
    	$rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
        };
    }
    
    return FlashService;
  }
]);