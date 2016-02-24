module.exports = function(app) {
    'use strict';

    return {

        listen: function(socket) {
            socket.on('chatRoomGet', function() {
				app.rooms.findChatRooms( function(data) {
                    console.log('findChatRooms');
                    app.socket.io.emit('chatRoomGet', data );
                });
			});
        }
    }
}
