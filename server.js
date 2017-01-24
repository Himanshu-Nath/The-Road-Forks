var db = require( './config/db');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var user = require('./route/trfUser');

app.post('/trf/api/register', user.registerUser);
app.post('/trf/api/login', user.loginUser);
app.post('/trf/api/forgetPassword', user.forgetPassword);

var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("server listening on "+port);
})

app.use('/', express.static(__dirname + '/'))
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})