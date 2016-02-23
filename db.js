var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

module.exports = function(app) {
    'use strict';

    return {
        // Connection URL 
        url: 'mongodb://localhost:27017/',
        instance: {},
        collections: {},
        create: function() {
            // Use connect method to connect to the Server 
            MongoClient.connect(this.url, function(err, db) {
                console.log("Connected correctly to server");
                app.db.instance = db;
                app.db.collections.chatRooms = app.db.instance.collection('chatRooms');
                app.db.collections.users = app.db.instance.collection('users');

                // app.db.deleteChatRooms(function(data) {
                //     console.log(data);
                // });
                // app.db.deleteUsers(function(data) {
                //     console.log(data);
                // });
            });
        },

        registerUser: function(user, callback) {
            this.collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
                console.log('findOne');
                console.log(result);
                if (result !== null) {
                    console.log('User exists already');
                } else {
                    app.db.collections.users.insert(
                        user,
                        function(err, result) {
                            callback(result);
                        });
                }
            });

        },
        
        insertChatRoom: function(name, description, latitude, longitude, callback) {
            this.collections.chatRooms.insert({
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude
            }, function(err, result) {
                callback(result);
            });
        },
        findChatRooms: function(callback) {

            this.collections.chatRooms.find({}).toArray(function(err, chatRooms) {
                callback(chatRooms);
            });
        },
        findChatRoom: function(chatRoomId, callback) {
            var ObjectId = require('mongodb').ObjectID;

            this.collections.chatRooms.findOne({ "_id": ObjectId(chatRoomId) }, function(err, chatRoom) {
                callback(chatRoom);
            });
        },
        deleteChatRooms: function(callback) {
            this.collections.chatRooms.remove({});
            callback();
        },
        deleteUsers: function(callback) {
            this.collections.users.remove({});
            callback();
        }
    }
}
