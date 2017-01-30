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

//Add New Trip
exports.addNewTrip = function(req, res){
    var trip = req.body;   
    var newTrip = new AllTrips({
        userId : trip.userId,
        name : trip.name,
        userImage : [],
        email : trip.email,
        place : trip.place,
        description : trip.desc,
        placeImages : [],
        tripType : trip.tripType,
        startPoint : trip.startPoint,
        endPoint : trip.endPoint,
        totalMembers : [trip.userId],
        like : [],
        comment : [],
        Cost : trip.cost,
        startDate : trip.startDate,
        endDate : trip.endDate,
        dop : trip.dop,
        dope : trip.dope,
        report : [],
        mobile : trip.mobile,
        maxMembers : trip.maxMembers,
        minMembers : trip.minMembers,
        maxAge : trip.maxAge,
        minAge : trip.minAge,
        onlyFor : trip.onlyFor,
        notes : trip.notes,
        tripTitle : trip.tripTitle,
        feedback : []
        });  

        newTrip.save(function(err, result){
        if (err) return console.error(err);
        if(result != null && result.length != 0){            
            res.send({status : true, result});               
        } else
            res.send({status : false});        
    });
}