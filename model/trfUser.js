var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    username : String,
    password : String,
    status : String,
    token : String,
    lastActive : String,
    image : String,
    question1 : String,
    answer1 : String
});
mongoose.model('trfuser', UserSchema);