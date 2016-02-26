module.exports = function (app) {
	'use strict';

	return{

		io: null,
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