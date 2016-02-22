var app = {};
app.server = require('./server')(app);
app.server.create();

app.socket = require('./socket')(app);
app.socket.create();

module.exports = app;

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});