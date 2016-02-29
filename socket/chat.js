var ent = require('ent'),
    dateFormat = require('dateformat'),
    ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {
    'use strict';

    return {

        rooms: [],
        listen: function(socket) {

            socket.on('userConnected', function(roomId, user) {

                // set the socket infos for this user, then join a specific channel named after a roomId
                socket.user = user;
                socket.facebookId = user.facebookId;
                socket.roomId = roomId;
                socket.join(roomId);

                if (app.chat.rooms[roomId] === undefined) {
                    app.chat.rooms[roomId] = [];
                }
                // push the user that just logged in the chat room into a dedicated room array in order to count how many people are in the room
                app.chat.rooms[roomId].push(user);

                // Update the chat room object with how many people currently are in the room
                app.rooms.updateChatRooms({ "_id": ObjectId(roomId)}, { 'users':app.chat.rooms[roomId].length }, function(data) {
                    // emit to the room only that the user connected and who is logged into this room
                    app.chat.emit(socket, 'userConnected', { 'user': user, 'users': app.chat.rooms[roomId] });
                    // emit to everyone an update about how many people currently are in the room
                    app.socket.io.emit('chatRoomUserNumberUpdate', { 'roomId': roomId, 'users': app.chat.rooms[roomId].length });
                });
            });

            socket.on('message', function(message) {
                // Encode the message and timestamp it.
                message = ent.encode(message);
                var now = new Date();
                app.chat.emit(socket, 'message', { date: dateFormat(now, "h:MM:ss"), user: socket.user, message: message });
            });

            socket.on('disconnect', function() {
                // remove the user from the room users array
                if (app.chat.rooms[socket.roomId] !== undefined) {
                    for (var i = 0; i < app.chat.rooms[socket.roomId].length; i++) {
                        if (app.chat.rooms[socket.roomId][i].facebookId === socket.facebookId) {
                            app.chat.rooms[socket.roomId].splice(i, 1);
                        }
                    }

                    // Update the chat room object with how many people currently are in the room and that the user disconnected
                    app.rooms.updateChatRooms({ "_id": ObjectId(socket.roomId)}, { 'users':app.chat.rooms[socket.roomId].length }, function(data) {
                        app.chat.emit(socket, 'userDeconnection', socket.facebookId);
                        app.socket.io.emit('chatRoomUserNumberUpdate', { 'roomId': socket.roomId, 'users': app.chat.rooms[socket.roomId].length });
                    });
                    
                    // remove the user from the room channel
                    socket.leave(socket.roomId);
                }

            });

        },

        // Emit only to the room channel
        emit: function(socket, channel, data) {
            app.socket.io.to(socket.roomId).emit(channel, data);
        }
    }
}
