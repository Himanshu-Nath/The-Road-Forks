var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var AllTripsSchema = new Schema({
    userId : String,
    name : String,
    userImage : String,
    email : String,
    place : String,
    description : String,
    placeImages : [],
    tripType : String,
    startPoint : String,
    endPoint : String,
    totalMembers : [],
    like : [],
    comment : [],
    Cost : Number,
    startDate : Date,
    endDate : Date,
    dop : Date,
    dope : Date,
    report : [],
    mobile : Number,
    maxMembers : Number,
    minMembers : Number,
    maxAge : Number,
    minAge : Number,
    onlyFor : String,
    notes : String,
    tripTitle : String,
    feedback : [],
    tripStatus : String
});
mongoose.model('trfalltrip', AllTripsSchema);