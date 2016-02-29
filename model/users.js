module.exports = function(app) {
    'use strict';

    return {
        // Check if a user exist, if not insert him in DB
        registerUser: function(user, callback) {
            app.db._collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
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
        // Insert a notification object into the 'notifications' array belonging to a user then emit this notification
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
                    app.socket.io.emit('notifiedUser', notifications);
                });
        },
        // get a user
        findUser: function(user, callback) {
            app.db._collections.users.findOne({ facebookId: user.facebookId }, function(err, result) {
                callback(users);
            });
        },
        // get all users
        findUsers: function(query, callback) {
            app.db._collections.users.find(query).toArray(function(err, users) {
                callback(users);
            });
        },
        // delete all users
        deleteUsers: function(callback) {
            app.db._collections.users.remove({});
            callback();
        }
    }
}
