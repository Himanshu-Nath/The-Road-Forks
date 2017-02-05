var express = require('express');
var user = require( '../model/trfUser');
var registereduser = require( '../model/trfRegistration');
var alltrip = require( '../model/trfAllTrip');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var dateFormat = require('dateformat'); 

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

//Get My Trips
exports.getMyTrip = function(req, res){   
    var id = req.params.userId; 
    AllTrips.find({"userId": id}, function(err, result) {
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
    imageName = 'file-trip' + '-' + Date.now() + '.' + trip.image.split('.')[trip.image.split('.').length -1];
    var newTrip = new AllTrips({
        userId : trip.id,
        name : trip.fullName,
        userImage : trip.image,
        email : trip.email,
        place : trip.placeName,
        description : trip.description,
        placeImages : [imageName],
        tripType : trip.type,
        startPoint : trip.startLocation,
        endPoint : trip.endLocation,
        totalMembers : [trip.id],
        like : [],
        comment : [],
        Cost : trip.tripCost,
        startDate : trip.startDate,
        endDate : trip.endDate,
        dop : Date.now(),
        dope : trip.dope,
        report : [],
        mobile : trip.mobile,
        maxMembers : trip.maxMembers,
        minMembers : trip.minMembers,
        maxAge : trip.maxAge,
        minAge : trip.minAge,
        onlyFor : trip.for,
        notes : trip.notes,
        tripTitle : trip.tripTitle,
        feedback : [],
        tripStatus : trip.tripStatus
        });  

        newTrip.save(function(err, result){
        if (err) return console.error(err);
        if(result != null && result.length != 0){            
            res.send({status : true, result});               
        } else
            res.send({status : false});        
    });
}

//Upload Trip Images
exports.addNewTripImage = function(req, res){
    upload(req,res,function(err){
        if(err){
            res.json({status : false});
            return;
        } 
        res.json({status : true});
    });
}