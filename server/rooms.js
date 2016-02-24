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
                app.rooms.instance = db;
                app.rooms.collections.chatRooms = app.rooms.instance.collection('chatRooms');

                // app.rooms.deleteChatRooms(function(data) {
                // });
            });
        },

        insertChatRoom: function(name, description, latitude, longitude, friendId, callback) {

            var friendId = friendId;
            this.collections.chatRooms.insert({
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude
            }, function(err, result) {
                console.log('friendId 2');
                console.log(friendId);

                for (var i = 0; i < friendId.length; i++) {
                    app.users.notificateFriend(friendId[i], result.insertedIds);
                };
                

                callback(result);
                
            });
        },
        findChatRooms: function(callback) {

            this.collections.chatRooms.find({}).toArray(function(err, chatRooms) {
                callback(chatRooms);
            });
        },
        updateChatRooms: function(chatRoom, update, callback) {

            this.collections.chatRooms.updateOne(
                chatRoom, {
                    $set: update,
                },
                function(err, chatRooms) {
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
        }
    }
}
