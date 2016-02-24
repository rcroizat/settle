var ent = require('ent'),
    dateFormat = require('dateformat');

module.exports = function(app) {
    'use strict';

    return {

        rooms: [],

        listen: function(socket) {

            // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
            socket.on('userConnected', function(roomId, user) {

                socket.user = user;
                socket.facebookId = user.facebookId;
                socket.roomId = roomId;

                socket.join(roomId);

                if (app.chat.rooms[roomId] === undefined) {
                    app.chat.rooms[roomId] = [];
                }

                app.chat.rooms[roomId].push(user);

                app.chat.emit(socket, 'userConnected', { 'user': user, 'users': app.chat.rooms[roomId] });
            });

            // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
            socket.on('message', function(message) {
                message = ent.encode(message);
                var now = new Date();
                app.chat.emit(socket, 'message', { date: dateFormat(now, "h:MM:ss"), user: socket.user, message: message });
            });

            socket.on('isTyping', function() {
                app.chat.emit(socket, 'isTyping', socket.pseudo);
            });

            socket.on('disconnect', function() {

                if (app.chat.rooms[socket.roomId] !== undefined) {
                    for (var i = 0; i < app.chat.rooms[socket.roomId].length; i++) {
                        if (app.chat.rooms[socket.roomId][i].facebookId === socket.facebookId) {
                            app.chat.rooms[socket.roomId].splice(i, 1);
                        }
                    }

                    app.chat.emit(socket, 'userDeconnection', socket.facebookId);

                    socket.leave(socket.roomId);
                }

            });

        },

        emit: function(socket, channel, data) {
            app.socket.io.to(socket.roomId).emit(channel, data);
        }
    }
}
