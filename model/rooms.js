module.exports = function(app) {
    'use strict';

    return {

        // Insert a chat room
        insertChatRoom: function(userName, userId, name, description, latitude, longitude, friendId, callback) {
            app.db._collections.chatRooms.insert({
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude
            }, function(err, result) {

                app.rooms.findChatRooms(function(chatRooms) {
                    app.socket.io.emit('newChatRoom', chatRooms);
                });

                // check if there is more than one invitation then register the notification
                if (Array.isArray(friendId) == true) {
                    for (var i = 0; i < friendId.length; i++) {
                        app.users.notificateFriend(friendId[i], userId, result.insertedIds[0], userName, description);
                    };
                } else {
                    app.users.notificateFriend(friendId, userId, result.insertedIds[0], userName, description);
                }
                callback(result);
            });
        },
        // get all chat rooms
        findChatRooms: function(callback) {
            app.db._collections.chatRooms.find({}).toArray(function(err, chatRooms) {
                callback(chatRooms);
            });
        },
        // Update one chat room
        updateChatRooms: function(chatRoom, update, callback) {
            app.db._collections.chatRooms.updateOne(
                chatRoom, {
                    $set: update,
                },
                function(err, chatRooms) {
                    callback(chatRooms);
                });
        },
        // get one chat room
        findChatRoom: function(query, callback) {
            app.db._collections.chatRooms.findOne(query, function(err, chatRoom) {
                callback(chatRoom);
            });
        },
        // Delete all chat rooms
        deleteChatRooms: function(callback) {
            app.db._collections.chatRooms.remove({});
            callback();
        }
    }
}
