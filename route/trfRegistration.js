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
                    userData.image = usersResult.image;
                    userData.lastActive = usersResult.lastActive;
                    userData.status = usersResult.status;
                    userData.username = usersResult.username;
                    userData.altId = usersResult.altId;
                    userData.secretKey = usersResult.secretKey;
                    res.send({status : true, result, userData});
                }
                else
                    res.send({status:false});        
            });
        } else
            res.send({status : false});        
    });
}