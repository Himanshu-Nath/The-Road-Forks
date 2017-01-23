var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trf');  // for Local DB
//mongoose.connect('mongodb://chatbot:chatbot@ds127429.mlab.com:27429/chatbot'); // for Cloud DB

var conn = mongoose.connection;

conn.on('error', console.error);
conn.once('open', function() {
	console.log("DB Connected Successfully");
});
