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

                    userData.image = usersResult.image;
                    userData.lastActive = usersResult.lastActive;
                    userData.status = usersResult.status;
                    userData.username = usersResult.username;
                    userData.altId = usersResult.altId;
                    userData.secretKey = usersResult.secretKey;
                    userData.dob = usersResult.dob;
                    res.send({status : true, userData});
                }
                else
                    res.send({status:false});        
            });
        } else
            res.send({status : false});        
    });
}