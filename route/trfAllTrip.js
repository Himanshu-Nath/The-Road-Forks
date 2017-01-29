var express = require('express');
var user = require( '../model/trfUser');
var registereduser = require( '../model/trfRegistration');
var alltrip = require( '../model/trfAllTrip');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var dateFormat = require('dateformat'); 

var Users = mongoose.model('trfuser');
var RegisteredUsers = mongoose.model('trfregistereduser');
var AllTrips = mongoose.model('trfalltrip');

var imageName;
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/tripImages');
  },
  filename: function (req, file, callback) {
    callback(null, imageName);    
  }
});

var upload = multer({ storage : storage }).single('file');

//Get All Trips
exports.allTrips = function(req, res){    
    AllTrips.find({}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0){            
            res.send({status : true, result});               
        } else
            res.send({status : false});        
    });
}
