angular.module('trfApp', ['ui.router', 'LocalStorageModule'])

.constant('AUTH', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  notAuthorized: 'auth-not-authorized'
});
