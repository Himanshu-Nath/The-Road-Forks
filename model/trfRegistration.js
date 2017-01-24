var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var RegisteredUserSchema = new Schema({
	userId	: String,
    firstName : String,
    lastName : String,
    token : String,
    friends : [],
	invitations : [],
	fav : [],
	block : [],
    email : String,
    org : Boolean,
    tripImages : [],
    visitedPlaces : [],
    newTrip : [],
    active : String
    });
mongoose.model('trfregistereduser', RegisteredUserSchema);