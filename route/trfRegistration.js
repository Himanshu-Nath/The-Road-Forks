var express = require('express');
var user = require( '../model/trfUser');
var registereduser = require( '../model/trfRegistration');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var dateFormat = require('dateformat'); 

var Users = mongoose.model('trfuser');
var RegisteredUsers = mongoose.model('trfregistereduser');

//Get User Profile
exports.getUserProfile = function(req, res){
    var id = req.params.profileId;
    var userData = {};
    
    Users.findOne({"_id": id}, function(err, usersResult) {
        if (err) return console.error(err);
        if(usersResult != null && usersResult.length != 0){
            RegisteredUsers.findOne({"userId": id}, 
            function(err, result) {
                if (err) return console.error(err);
                if(result != null && result.length != 0) {
                    userData.active = result.active;
                    userData.block = result.block;
                    userData.email = result.email;
                    userData.favPlaces = result.favPlaces;
                    userData.firstName = result.firstName;
                    userData.lastName = result.lastName;
                    userData.friends = result.friends;
                    userData.invitations = result.invitations;
                    userData.newTrip = result.newTrip;
                    userData.tripImages = result.tripImages;
                    userData.userId = result.userId;
                    userData.visitedPlaces = result.visitedPlaces;
                    userData.gender = result.gender;
                    userData.description = result.description;
                    userData.hobbie = result.hobbie;
                    userData.address = result.address;

                    userData.image = usersResult.image;
                    userData.lastActive = usersResult.lastActive;
                    userData.status = usersResult.status;
                    userData.username = usersResult.username;
                    userData.altId = usersResult.altId;
                    userData.secretKey = usersResult.secretKey;
                    userData.dob = usersResult.dob;
                    userData.mobile = usersResult.mobile;
                    userData.doj = usersResult.doj;
                    res.send({status : true, userData});
                }
                else
                    res.send({status:false});        
            });
        } else
            res.send({status : false});        
    });
}

//Edit Profile
exports.editUserProfile = function(req, res){
    var data = req.body;   
    Users.update({"_id": data.userId}, {$set: {"altId" : data.altId, "secretKey" : data.secretKey, "mobile":data.mobile,
        "status" : data.status }}, function(err, result) {
            console.log(result);
    });
    RegisteredUsers.update({"userId": data.userId}, {$set: {"description" : data.description, "hobbie":data.hobbie,
         "address":data.address}}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0) {
            console.log(result);
            res.send({status : true});
        }
        else
            res.send({status:false});        
    });
}

//Send Friend Request
exports.sendFreindRequest = function(req, res){
    var data = req.body;
    // RegisteredUsers.update({"userId": data.to}, {$push: {"invitations" : {"from" : data.from, "name" : data.name, 
    //     "image" : data.image, "date" : data.date, "status" : data.status}}}, function(err, result) {
    //     if (err) return console.error(err);
    //     if(result != null) {
    //         res.send({status : true});
    //     }
    //     else
    //         res.send({status:false});        
    // });
    RegisteredUsers.findOne({"invitations": { $elemMatch: { "from" : data.from}}}, function(err, result) {
        if (err) {
            return console.error(err);
        }
        if(result == null) {
            RegisteredUsers.update({"userId": data.to}, {$push: {"invitations" : {"from" : data.from, "name" : data.name, 
                "image" : data.image, "date" : data.date, "status" : data.status}}}, function(err, result) {
                if (err) return console.error(err);
                if(result != null) {
                    res.send({status : true});
                }
                else
                    res.send({status:false});        
            });
        } else if(result != null) {
            res.send({status : false});   
        }  
    });
}

//Send Message
exports.sendMessage = function(req, res){
    var data = req.body;

    RegisteredUsers.update({"message": { $elemMatch: { "from" : data.from}}}, {"$push":{"message.$.msgInfo":[{"date" :
     data.date, "direction" : data.direction, "message" : data.message }]}}, function(err, result) {
        if (err) {            
            return console.error(err);
        }
        if(result.nModified == 0) {
            RegisteredUsers.update({"userId": data.to}, {$push: {"message" : {"from" : data.from, "name" : data.name, 
            "image" : data.image, "msgInfo":[{ "date" : data.date, "direction" : data.direction, "message" : data.message
            }]}}}, function(err, result) {
                if (err) return console.error(err);
                if(result.nModified > 0) {
                    res.send({status : true});
                }
                else if(result.nModified == 0)
                    res.send({status:false});        
            });
        } else if(result.nModified > 0) {
            res.send({status : true});   
        }  
    });
}