var db = require( './config/db');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var user = require('./route/user');
var registereduser = require('./route/registereduser');
app.post('/api/register', user.registerUser);
app.post('/api/login', user.loginUser);

app.post('/api/get/registeredUser', registereduser.getRegistereduser);
app.post('/api/sendFriendRequest', registereduser.sendFriendRequest);

var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("server listening on 2016");
})


app.use('/', express.static(__dirname + '/'))
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})
