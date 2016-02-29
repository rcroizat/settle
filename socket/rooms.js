module.exports = function(app) {
    'use strict';

    return {

        listen: function(socket) {
            // Emit all the chat rooms
            socket.on('chatRoomGet', function() {
				app.rooms.findChatRooms(function(data) {
                    app.socket.io.emit('chatRoomGet', data );
                });
			});
        }
    }
}
