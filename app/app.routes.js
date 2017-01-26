angular.module('trfApp')

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('login', {
          url : '/login',
          templateUrl: 'app/components/loginDashboard.view.html',
          authenticate: true,
          data : {'headerName' : 'THE ROAD FORKS', 'pageName' : 'Login'}
        })

        .state('login.signin', {
          url : '/signin',
          templateUrl : 'app/components/login/login.view.html',
          authenticate : true          
        })

        .state('login.registration', {
          url : '/registration',
          templateUrl : 'app/components/registration/registration.view.html',
          authenticate : true,
          data : {'headerName' : 'THE ROAD FORKS', 'pageName' : 'Registration'}
        })

        .state('login.forgotPassword', {
          url : '/forgotPassword',
          templateUrl : 'app/components/forgotPassword/forgotPassword.view.html',
          authenticate : true,
          data : {'headerName' : 'THE ROAD FORKS', 'pageName' : 'Forgot Password'}
        })

        .state('home', {
          url : '/home',
          templateUrl : 'app/components/partner/home/home.view.html',
          authenticate : true
        });

        $urlRouterProvider.otherwise('/login/signin');
  }
])

.run(function ($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    // if(toState.name.slice(0,5) != "login" && fromState.name.slice(0,5) != "login"
    //     && toState.name.slice(0,5) != fromState.name.slice(0,5)) {
    // if(authenticate) {
    //   console.log("Sorry you can't navigate");
    //   event.preventDefault();
    // }
    //$state.current.name;
    // if (toState.authenticate && !AuthService.isAuthenticated()){
    //   $state.transitionTo("login");
    //   event.preventDefault();
    // }
  });
});



//$rootScope.$on('$stateChangeSuccess', function() {
//               $rootScope.adminFlag = $window.localStorage.getItem('adminFlag');
//
//               if( vm.$state.current.name === 'elearning.browse' || vm.$state.current.name === 'elearning.search-results') {
//                       // Get master courses and products
//                       vm.getMasterProductCategory( null );
//                       // Get all courses
//                       vm.getAllCourses( null );
//               }
//
//               if( vm.$state.current.name === 'elearning.home') {
//                       // Get all courses
//                       vm.getAllCourses( null );
//               }
//       });
