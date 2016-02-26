var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

module.exports = function(app) {
    'use strict';

    return {

        url: 'mongodb://localhost:27017/',
        _db: null,
        _collections: {},

        // Connect to the MongoDB database then load the database and the users and chatRooms collections
        connect: function() {
            MongoClient.connect(this.url, function(err, db) {
                app.db._db = db;
                app.db._collections.users = app.db._db.collection('users');
                app.db._collections.chatRooms = app.db._db.collection('chatRooms');
            });
        }
    }
}