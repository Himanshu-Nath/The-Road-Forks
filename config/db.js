var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/trf');  // for Local DB
// mongoose.connect('mongodb://chatbot:chatbot@ds127429.mlab.com:27429/chatbot'); // for Cloud DB
mongoose.connect('mongodb://theroadfork:theroadfork@theroadfork-shard-00-00-rhhq3.gcp.mongodb.net:27017,theroadfork-shard-00-01-rhhq3.gcp.mongodb.net:27017,theroadfork-shard-00-02-rhhq3.gcp.mongodb.net:27017/trf?ssl=true&replicaSet=theroadfork-shard-0&authSource=admin');

var conn = mongoose.connection;

conn.on('error', console.error);
conn.once('open', function() {
	console.log("DB Connected Successfully");
});
