module.exports = function(app) {
    'use strict';

    return {

        listen: function(socket) {
            socket.on('facebookLogin', function(user) {
                app.users.registerUser(user, function(data) {
                    console.log('socket register user');
                    app.socket.io.emit('facebookLogin', data);
                });
            });
        }
    }
}
