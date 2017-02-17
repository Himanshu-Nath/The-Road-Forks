var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var RegisteredUserSchema = new Schema({
	userId	: String,
    firstName : String,
    lastName : String,
    token : String,
    friends : [],
	invitations : [],
	favPlaces : [],
	block : [],
    email : String,
    org : Boolean,
    tripImages : [],
    visitedPlaces : [],
    newTrip : [],
    active : String,
    gender : String,
    hobbie : String,
    description : String
    });
mongoose.model('trfregistereduser', RegisteredUserSchema);