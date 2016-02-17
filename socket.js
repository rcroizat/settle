var ent = require('ent'),
    dateFormat = require('dateformat');

module.exports = function (app) {
	'use strict';

	return{

		io: null,
		users: [],
		create: function () {
			this.io = require('socket.io')(app.server._server);
			this.listen();
		},

		listen: function () {
			this.io.sockets.on('connection', function (socket, pseudo) {

				// Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
				socket.on('nouveau_client', function(pseudo) {
				    app.socket.users.push({'id':socket.id, 'pseudo': pseudo});
				    pseudo = ent.encode(pseudo);
				    socket.pseudo = pseudo;
				    app.socket.io.emit('nouveau_client', {'pseudo':pseudo, 'users':app.socket.users});
				    // this.emit('nouveau_client', {'pseudo':pseudo, 'users':app.socket.users});
				});

				// Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
				socket.on('message', function (message) {
				    message = ent.encode(message);
				    var now = new Date();
				    app.socket.io.emit('message', {date: dateFormat(now, "h:MM:ss"), pseudo: socket.pseudo, message: message});
				    // this.emit('message', {date: dateFormat(now, "h:MM:ss"), pseudo: socket.pseudo, message: message});
				});

				socket.on('isTyping', function () {
				    app.socket.io.emit('isTyping', socket.pseudo);
				    // this.emit('isTyping', socket.pseudo);
				});

				socket.on('disconnect', function () {

				    for (var i = 0; i < app.socket.users.length; i++) {
				        if (app.socket.users[i].id === socket.id) {
				            app.socket.users.splice(i,1);
				        }
				    }

				    app.socket.io.emit('userDeconnection', socket.id);
				    // this.emit('userDeconnection', socket.id);
				});
			});
		},

		emit: function (channel, data) {
			app.socket.io.emit(channel, data);
		}
	}
}

// var users = [];
// io.sockets.on('connection', function (socket, pseudo) {

//     // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
//     socket.on('nouveau_client', function(pseudo) {
//         users.push({'id':socket.id, 'pseudo': pseudo});
//         pseudo = ent.encode(pseudo);
//         socket.pseudo = pseudo;
//         io.emit('nouveau_client', pseudo, socket.id);
//     });

//     // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
//     socket.on('message', function (message) {
//         message = ent.encode(message);
//         var now = new Date();
//         io.emit('message', {date: dateFormat(now, "h:MM:ss"), pseudo: socket.pseudo, message: message});
//     });

//     socket.on('disconnect', function () {

//         for (var i = 0; i < users.length; i++) {
//             if (users[i].id === socket.id) {
//                 users.splice(i,1);
//             }
//         }

//         io.emit('userDeconnection', socket.id);
//     });
// });