module.exports = function(app) {
    'use strict';

    return {
        registerUser: function(user, callback) {
            app.db._collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
                if (result !== null) {
                    callback('exist');
                } else {
                    app.users.collections.users.insert(
                        user,
                        function(err, result) {
                            callback(result);
                        });
                }
            });

        },
        notificateFriend: function(friendId, notifierId, roomId) {
            var notifications = {};
            notifications.notifier = notifierId;
            notifications.room = roomId;
            app.db._collections.users.updateOne({ facebookId: friendId }, {
                    $push: { 'notifications': notifications }
                },
                function(err, data) {
                    notifications.friendId = friendId;
                    app.socket.io.emit('notifiedUser', notifications); // notificate the users
                });
        },
        findUser: function(user, callback) {
            app.db._collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
                callback(users);
            });
        },
        findUsers: function(query, callback) {
            app.db._collections.users.find(query).toArray(function(err, users) {
                callback(users);
            });
        },
        findNotifications: function(facebookId, callback) {
            app.db._collections.users.findOne({ facebookId: facebookId }, function(err, result) {
                callback(users);
            });
        },
        deleteUsers: function(callback) {
            app.db._collections.users.remove({});
            callback();
        }
    }
}
