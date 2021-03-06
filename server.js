var db = require( './config/db');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mail = require('./route/mail');
var user = require('./route/trfUser');
var profile = require('./route/trfRegistration');
var trip = require('./route/trfAllTrip');

app.post('/trf/api/register', user.registerUser);
app.post('/trf/api/login', user.loginUser);
app.post('/trf/api/uploadImage', user.uploadProfileImage);
app.post('/trf/api/changeImage', user.changeProfileImage);
app.post('/trf/api/removeImage', user.removeProfileImage);
app.post('/trf/api/forgetPasswordByQuestions', user.forgetPasswordByQuestions);

app.get('/trf/api/profile/get/:profileId', profile.getUserProfile);
app.post('/trf/api/profile/edit', profile.editUserProfile);

app.post('/trf/api/forgetPasswordByMail', mail.forgetPasswordByMail);

app.get('/trf/api/post/allTrips', trip.allTrips);
app.post('/trf/api/post/newTrip', trip.addNewTrip);
app.get('/trf/api/post/myTrip/:userId', trip.getMyTrip);
app.post('/trf/api/post/edit', trip.editTrip);
app.get('/trf/api/post/findTrip/:place', trip.findTrip);
app.get('/trf/api/post/placeById/:placeId', trip.placeById);
app.put('/trf/api/post/delete/:postId', trip.deleteTrip);
app.post('/trf/api/post/addPostImage', trip.addNewTripImage);

app.post('/trf/api/send/freindRequest', profile.sendFreindRequest);
app.post('/trf/api/send/message', profile.sendMessage);

var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("server listening on "+port);
})

app.use('/', express.static(__dirname + '/'))
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})