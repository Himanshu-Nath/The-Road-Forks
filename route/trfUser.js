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
    callback(null, './uploads/profilePics');
  },
  filename: function (req, file, callback) {
    if(imageName != undefined)
        callback(null, imageName);
    else
        callback(null, 'file' + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }  
});

var upload = multer({ storage : storage }).single('file');

//Register User
exports.registerUser = function(req, res){
    var user = req.body;
    var userId;
    var email = user.email;

    imageName = 'file' + '-' + Date.now() + '.' + user.profilePicName.split('.')[user.profilePicName.split('.').length -1];
    var user = new Users({
        firstName: user.firstName,
        lastName : user.lastName,
        username : user.username,
        password : user.conformPassword,
        status : "Active",
        token : user.token,
        mobile : user.mobile,
        lastActive : "",
        image : imageName,
        // image : "",
        question1 : user.question,
        answer1 : user.answer,
        email : user.email,
        altId : user.username,
        secretKey : "Abcd$12345",
        dob : "",
        doc : ""

    });    
    
    user.save(function(err, result){
        userId = result._id;
        if(err){
            response.errorMsg = err;
            res.send(response);
        }else{            
            var registerUser = new RegisteredUsers({
                userId : userId,
                firstName: user.firstName,
                lastName : user.lastName,
                token : user.token,
                friends : [],
                invitations : [],
                favPlaces : [],
                block : [],
                email : email,
                org : false,
                tripImages : [],
                visitedPlaces : [],
                newTrip : [],                
                active : "Offline",
                gender : "Male",
                description : "Simple and unique",
                hobbie : "Badminton",
                address : "Dehri On Sone, Bihar, India"
                
            });          
            registerUser.save(function(err, result){});          
        res.send({status:true, playerId: userId});
      }
    });
}

//Login User
exports.loginUser = function(req, res){
    var user = req.body;
    Users.findOne({"username": user.username, "password": user.password, "token": user.token, "status": "Active"}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0) {
            RegisteredUsers.findOne({"userId": result._id}, function(err, registeredResult) {
                if (err) return console.error(err);
                if(registeredResult != null && registeredResult.length != 0) {
                    res.send({status : true, result, gender : registeredResult.gender});   
                }
                else
                    res.send({status:false});        
            });
        }
        else
            res.send({status:false});        
    });
}
    
//Forgot User Password
exports.forgetPasswordByQuestions = function(req, res){
    var user = req.body;
    
    Users.findOne({"username": user.username}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0){
            Users.findOne({"username": user.username, "question1": user.question, "answer1": user.answer}, 
            function(err, result) {
                if (err) return console.error(err);
                if(result != null && result.length != 0)
                    res.send({status : true, user : true, result});
                else
                    res.send({status:false, user : true});        
            });
        } else
            res.send({status : false, user : false});        
    });
}

//Upload Profile Pic
exports.uploadProfileImage = function(req, res){
    upload(req,res,function(err){
        if(err){
            res.json({status : false});
            return;
        } 
        res.json({status : true});
    });
}

//Change Profile Pic
exports.changeProfileImage = function(req, res){
    upload(req,res,function(err){
        if(err){
            res.json({status : false});
            return;
        } else {
            console.log(req.body);
            console.log(req.file);
            Users.update({"_id": req.body.userId}, {$set: {"image" : req.file.filename}}, function(err, result) {
            });
            AllTrips.update({"userId": req.body.userId}, {$set: {"userImage" : req.file.filename}}, function(err, result) {
            });
        }
        res.json({status : true, name: req.file.filename});
    });
}

//Remove Profile Image
exports.removeProfileImage = function(req, res){
    var data = req.body;
    AllTrips.update({"userId": data.userId}, {$set: {"userImage" : data.imageName}}, function(err, result) {
    });
    Users.update({"_id": data.userId}, {$set: {"image" : data.imageName}}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0) {
            res.send({status : true});
        }
        else
            res.send({status:false});        
    });
}