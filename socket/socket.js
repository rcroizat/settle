module.exports = function (app) {
	'use strict';

	return{

		io: null,
		// Connect to socket.io then listen on user connection to the socket in the chat, room and user socket modules
		create: function () {
			this.io = require('socket.io')(app.server._server);
			this.listen();
		},
		listen: function() {
            app.socket.io.sockets.on('connection', function(socket) {
                app.chat.listen(socket);
				app.socketRooms.listen(socket);
				app.socketUsers.listen(socket);
            });
        }
	}
}