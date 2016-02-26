module.exports = function(app) {
    'use strict';

    return {

        insertChatRoom: function(userName, userId, name, description, latitude, longitude, friendId, callback) {
            app.db._collections.chatRooms.insert({
                name: name,
                description: description,
                latitude: latitude,
                longitude: longitude
            }, function(err, result) {

                app.rooms.findChatRooms(function (chatRooms) {
                    app.socket.io.emit('newChatRoom', chatRooms);
                });

                console.log('friendId');
                console.log(friendId);

                if (Array.isArray(friendId) == true) {
                    for (var i = 0; i < friendId.length; i++) {
                      app.users.notificateFriend(friendId[i], userId, result.insertedIds[0], userName, description);
                    };
                }else{
                      app.users.notificateFriend(friendId, userId, result.insertedIds[0], userName, description );
                }
                callback(result);
            });
        },
        findChatRooms: function(callback) {
            app.db._collections.chatRooms.find({}).toArray(function(err, chatRooms) {
                callback(chatRooms);
            });
        },
        updateChatRooms: function(chatRoom, update, callback) {
            app.db._collections.chatRooms.updateOne(
                chatRoom, {
                    $set: update,
                },
                function(err, chatRooms) {
                    callback(chatRooms);
                });
        },
        findChatRoom: function( query, callback) {
            app.db._collections.chatRooms.findOne(query, function(err, chatRoom) {
                callback(chatRoom);
            });
        },
        deleteChatRooms: function(callback) {
            app.db._collections.chatRooms.remove({});
            callback();
        }
    }
}
