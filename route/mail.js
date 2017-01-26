var express = require('express');
var nodemailer = require("nodemailer");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require( '../model/trfUser');
var generator = require('generate-password');

var Users = mongoose.model('trfuser');

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sampotter723@gmail.com',
        pass: 'Sampotter@723' //You have to turn of secure access from gmail "Review blocked sign-in attempt"
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


//Send Email
exports.forgetPasswordByMail = function(req, res){
    var user = req.body;
    var findStatus = false;
    var setStatus = false;

    var tempPassword = generator.generate({
        length: 10,
        numbers: true
    });

    Users.findOne({email: user.email}, function(err, findResult) {
        if (err) return console.error(err);
        if(findResult != null && findResult.length != 0) {
            Users.update({"email": user.email}, {$set: {"password" : tempPassword}}, function(err, updateResult) {
                if (err) return console.error(err);
                if(updateResult != null && updateResult.length != 0) {
                    setStatus = true;
                    mailSending(findResult, tempPassword, res);
                    // res.send({status:true});
                }
            });
        }
        else {
            findStatus = false; 
            res.send({status:false, user: false});   
        }
    });  
}

var mailSending = function(result, pass, res){
    var mailOptions={
		to : result.email,
		subject : "Forgot Your Password In The Road Forks ?",
		text : "Hello " +result.firstName+ ",\nYou recently request to reset your password for your The Road Forks"+
        " social account. Here is your new Password.\n\n "+pass+"\n\nIf you don't request a password reset "+
        "please ignore this email or reply to let us know. \n\n Thanks\nThe Road Forks Team \n\n P.S. We also love "+
        "hearing from you and helping you with any issues\n you have. Please reply to this email if you want to ask a"+
        " question or just say hi."
	}
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
            res.send({status:false, user: true});
            return false;
	 }else{
        	console.log("Message sent: " + response.message);
            res.send({status:true, user: true});
            return true
    	 }
    });
}