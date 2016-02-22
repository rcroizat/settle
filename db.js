var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

module.exports = function(app) {
    'use strict';

    return {
        // Connection URL 
        url: 'mongodb://localhost:27017/',
        instance: {},
        create: function() {
            // Use connect method to connect to the Server 
            MongoClient.connect(this.url, function(err, db) {
                console.log("Connected correctly to server");
                app.db.instance = db;

                // app.db.insertChatRooms(function(data) {
                //     console.log(data);
                // })
            });
        },
        insertChatRoom: function(name, description, latitude, longitude,  callback) {
            var collection = app.db.instance.collection('chatRooms');
            /// Insert some documents 
            collection.insert(
                {   name: name, 
                    description: description,
                    latitude: latitude,
                    longitude: longitude 
                },function(err, result) {
                callback(result);
            });
        },
        findChatRooms: function(callback) {
            // Get the documents collection 
            var collection = app.db.instance.collection('chatRooms');
            // Find some documents 
            collection.find({}).toArray(function(err, chatRooms) {
                console.log("Found the following records");
                console.info(chatRooms);
                // return chatRooms;
                callback(chatRooms);
            });
        },
        findChatRoom: function(chatRoomId, callback) {
            var collection = app.db.instance.collection('chatRooms');
            var ObjectId = require('mongodb').ObjectID;

            collection.findOne( { "_id": ObjectId(chatRoomId) }, function (err, chatRoom) {
                console.log(chatRoom);
                callback(chatRoom); 
            });
        },
        deleteChatRooms: function(callback) {
            // Get the documents collection 
            var collection = app.db.instance.collection('chatRooms');
            // Find some documents 
            collection.remove({});
            callback();
        }
    }
}
