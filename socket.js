var ent = require('ent'),
    dateFormat = require('dateformat');

module.exports = function (app) {
	'use strict';

	return{

		io: null,
		users: [],
		create: function () {
			this.io = require('socket.io')(app.server._server);
			this.listen();
		},

		listen: function () {
			this.io.sockets.on('connection', function (socket) {
				socket.on('chatRoomGet', function() {
					app.db.findChatRooms( function(data) {
	                     app.socket.io.emit('chatRoomGet', data );
	                });
				});

			});
		},

		emit: function (channel, data) {
			app.socket.io.emit(channel, data);
		}
	}
}