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
        insertChatRooms: function(callback) {
            var collection = app.db.instance.collection('chatRooms');
            /// Insert some documents 
            collection.insertMany([{
                "users": 195,
                "name": "Holmes COSMETEX",
                "address": "618 Bushwick Court, Helen, District Of Columbia, 7976",
                "registered": "2016-01-12T04:09:11 -01:00",
                "latitude": 48.856894,
                "longitude": 2.370497
            }, {
                "users": 88,
                "name": "Walters MIRACLIS",
                "address": "304 Cortelyou Road, Walland, New Hampshire, 4654",
                "registered": "2016-01-22T02:58:40 -01:00",
                "latitude": 48.850227,
                "longitude": 2.372221
            }, {
                "users": 135,
                "name": "Montgomery INSURON",
                "address": "415 Ridgewood Place, Escondida, Vermont, 3031",
                "registered": "2016-01-13T08:07:16 -01:00",
                "latitude": 48.854769,
                "longitude": 2.37876
            }], function(err, result) {
                console.log("Inserted 3 chatrooms into the chatrooms collection");
                callback(result);
            });
        },
        findChatRooms: function(callback) {
            // Get the documents collection 
            var collection = app.db.instance.collection('chatRooms');
            // Find some documents 
            collection.find({}).toArray(function(err, chatRooms) {
                console.log("Found the following records");
                console.dir(chatRooms);
                // return chatRooms;
                callback(chatRooms);
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
