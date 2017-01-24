var express = require('express');
var user = require( '../model/trfUser');
var registereduser = require( '../model/trfRegistration');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Users = mongoose.model('trfuser');
var RegisteredUsers = mongoose.model('trfregistereduser');

//Register User
exports.registerUser = function(req, res){
    console.log(req.body);
    var user = req.body;
    var userId;
    var email = user.email;
    
    var user = new Users({
        firstName: user.firstName,
        lastName : user.lastName,
        username : user.username,
        password : user.conformPassword,
        status : "Active",
        token : user.token,
        lastActive : "",
        image : "",
        question1 : user.question,
        answer1 : user.answer,
        email : user.email
    });    
    
    user.save(function(err, result){
        userId = result._id;
        console.log("result : "+userId);
        if(err){
            response.errorMsg = err;
            res.send(response);
        }else{            
            console.log("firstName : "+user.firstName);
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
                active : "Offline"
            });          
            registerUser.save(function(err, result){});          
        res.send({status:true});
      }
    });
}

//Login User
exports.loginUser = function(req, res){
    var user = req.body;
    
    Users.findOne({"username": user.username, "password": user.password, "token": user.token}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0) {
            console.log(result);
            console.log(result.token);
            res.send({status : true, result});
        }
        else
            res.send({status:false});
        
    });
}
    
//Forgot User Password
exports.forgetPassword = function(req, res){
    var user = req.body;
    
    Users.findOne({"username": user.username, "email": user.email, "question1": user.question
                , "answer1": user.answer}, function(err, result) {
        if (err) return console.error(err);
        if(result != null && result.length != 0) {
            console.log(result);
            console.log(result.token);
            res.send({status : true, result});
        }
        else
            res.send({status:false});
        
    });  
}