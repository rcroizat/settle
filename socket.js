module.exports = function (app) {
	'use strict';

	return{

		io: null,
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
				socket.on('facebookLogin', function(user) {
					app.db.registerUser(user,  function(data) {
	                     app.socket.io.emit('facebookLogin', data );
	                });
				});

			});
		},

		emit: function (channel, data) {
			app.socket.io.emit(channel, data);
		}
	}
}