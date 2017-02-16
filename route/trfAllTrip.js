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

//Find Trip
exports.findTrip = function(req, res){   
    var place = req.params.place;
    AllTrips.find({"place": { $regex : new RegExp(place, "i") }}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0){            
            res.send({status : true, result});               
        } else
            res.send({status : false});        
    });
}

//Find Trip By Id placeById
exports.placeById = function(req, res){   
    var placeId = req.params.placeId;
    AllTrips.find({"_id": placeId}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0){            
            res.send({status : true, result});               
        } else
            res.send({status : false});        
    });
}

//Edit Trip
exports.editTrip = function(req, res){   
    var trip = req.body;
    if(trip.placeImage != undefined)
        imageName = 'file-trip' + '-' + Date.now() + '.' + trip.placeImage.split('.')[trip.placeImage.split('.').length -1];
    else
        imageName = trip.placeImages[0];    
    AllTrips.update({"_id": trip._id}, {$set: {"place" : trip.place, "tripTitle" : trip.tripTitle, "description" : 
        trip.description, "tripType" : trip.tripType, "startPoint" : trip.startPoint, "endPoint" : trip.endPoint,
        "Cost" : trip.Cost, "startDate" : trip.dayStartDate, "endDate" : trip.dayEndDate, "dope" : trip.dayDateOfPostEnd, 
        "minMembers" : trip.minMembers, "maxMembers" : trip.maxMembers, "minAge" : trip.minAge, "maxAge" : trip.maxAge,
        "onlyFor" : trip.onlyFor, "notes" : trip.notes, "tripStatus" : trip.tripStatus, "placeImages": [imageName]}}, function(err, result) {
            if (err) return console.error(err);
            if(result != null && result.length != 0){            
                res.send({status : true, result});               
            } else
                res.send({status : false});
    });
}

//Delete Trip
exports.deleteTrip = function(req, res){   
    var postId = req.params.postId;
    AllTrips.remove({"_id": postId}, function(err, result) {
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