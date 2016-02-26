module.exports = function(app) {
    'use strict';

    return {
        registerUser: function(user, callback) {
            app.db._collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
                // Check if user exist, if not insert in the DB
                if (result !== null) {
                    callback('exist');
                } else {
                    app.db._collections.users.insert(
                        user,
                        function(err, result) {
                            callback(result);
                        });
                }
            });
        },

        notificateFriend: function(friendId, notifierId, roomId, userName, description) {
            var notifications = {};
            notifications.notifier = notifierId;
            notifications.room = roomId;
            app.db._collections.users.updateOne({ facebookId: friendId }, {
                    $push: { 'notifications': notifications }
                },
                function(err, data) {
                    notifications.friendId = friendId;
                    notifications.userName = userName;
                    notifications.descriptionRoom = description;
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
