module.exports = function(app) {
    'use strict';

    return {

        listen: function(socket) {
            // When a user log in with facebook try to register him in DB then emit the callback to the front end
            socket.on('facebookLogin', function(user) {
                app.users.registerUser(user, function(data) {
                    app.socket.io.emit('facebookLogin', data);
                });
            });

            // Get user notifications
            socket.on('updateNotifications', function(facebookId) {
                app.users.getUserNotifications(facebookId, function(data) {
                    app.socket.io.emit('userNewNotifications', data);
                });
            });
        }
    }
}
