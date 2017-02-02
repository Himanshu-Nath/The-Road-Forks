angular.module('trfApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap', 'ngFileUpload'])

.constant('QUERY_QUESTIONS', {
	"questionList" : ["Your First School Name ?", "Your First Pet Name ?", "Your Nick Name ?",
    "Your Current Bike Number ?", "Your Graduation Percentage ?", "Your First Boss Name ?", "Your Father Last Name ?"]
})

.constant('URL', {
	"profile_images" : "http://localhost:3001/uploads/profilePics/",
	"logo_images" : "http://localhost:3001/assets/images/"
});