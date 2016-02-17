var ent = require('ent'),
    dateFormat = require('dateformat');

module.exports = function (app) {
	'use strict';

	return{

		io: null,
		users: [],
		chatRooms: 
		[
		  {
		    "_id": "56c482eef4d42d90966083e2",
		    "picture": "http://placehold.it/32x32",
		    "users": 90,
		    "name": "Boyd Hendricks TRANSLINK",
		    "address": "619 Franklin Avenue, Thermal, Rhode Island, 8503",
		    "registered": "2016-02-06T11:17:08 -01:00",
		    "latitude": 48.853043,
		    "longitude": 2.374199
		  },
		  {
		    "_id": "56c482eeee5280ca6fa7f2d3",
		    "picture": "http://placehold.it/32x32",
		    "users": 93,
		    "name": "English Foley KENEGY",
		    "address": "902 John Street, Graball, Minnesota, 9224",
		    "registered": "2016-01-07T04:05:11 -01:00",
		    "latitude": 48.855551,
		    "longitude": 2.373502
		  },
		  {
		    "_id": "56c482ee603132c2735e5fc9",
		    "picture": "http://placehold.it/32x32",
		    "users": 130,
		    "name": "Gilliam Hendrix COMTREK",
		    "address": "328 Jefferson Street, Canby, Texas, 7866",
		    "registered": "2016-01-30T10:33:09 -01:00",
		    "latitude": 48.856356,
		    "longitude": 2.373523
		  },
		  {
		    "_id": "56c482eefcbc8a7ff96b4e84",
		    "picture": "http://placehold.it/32x32",
		    "users": 45,
		    "name": "Colon Blankenship COGNICODE",
		    "address": "749 Lyme Avenue, Centerville, North Dakota, 4363",
		    "registered": "2016-01-18T11:13:13 -01:00",
		    "latitude": 48.853941,
		    "longitude": 2.37073
		  },
		  {
		    "_id": "56c482ee87297c2bcda7056e",
		    "picture": "http://placehold.it/32x32",
		    "users": 93,
		    "name": "Kathie Chan CENTREE",
		    "address": "527 Village Court, Darbydale, Idaho, 780",
		    "registered": "2016-01-30T11:37:15 -01:00",
		    "latitude": 48.851254,
		    "longitude": 2.372573
		  },
		  {
		    "_id": "56c482eec01f20b93a58e8ca",
		    "picture": "http://placehold.it/32x32",
		    "users": 77,
		    "name": "Ila Byers HOMETOWN",
		    "address": "456 Crescent Street, Efland, Virginia, 4630",
		    "registered": "2016-01-26T08:14:24 -01:00",
		    "latitude": 48.851547,
		    "longitude": 2.377712
		  },
		  {
		    "_id": "56c482ee58d607592526ab90",
		    "picture": "http://placehold.it/32x32",
		    "users": 79,
		    "name": "Maricela Dyer TELLIFLY",
		    "address": "279 Butler Street, Hessville, Alabama, 5097",
		    "registered": "2016-01-05T03:16:22 -01:00",
		    "latitude": 48.857129,
		    "longitude": 2.378253
		  },
		  {
		    "_id": "56c482ee127070b8fa7cb5ec",
		    "picture": "http://placehold.it/32x32",
		    "users": 105,
		    "name": "Sharron Ferguson DENTREX",
		    "address": "705 Irving Place, Itmann, Montana, 9816",
		    "registered": "2016-02-09T05:28:48 -01:00",
		    "latitude": 48.854324,
		    "longitude": 2.378746
		  },
		  {
		    "_id": "56c482eea8dca97c47a9afa6",
		    "picture": "http://placehold.it/32x32",
		    "users": 180,
		    "name": "Marisa Kinney NSPIRE",
		    "address": "385 Bowne Street, Waterford, New York, 4392",
		    "registered": "2016-02-15T04:00:19 -01:00",
		    "latitude": 48.858463,
		    "longitude": 2.373414
		  },
		  {
		    "_id": "56c482ee24889f8ebbbd2695",
		    "picture": "http://placehold.it/32x32",
		    "users": 158,
		    "name": "Valeria Payne QUILK",
		    "address": "768 Glen Street, Chumuckla, Michigan, 5186",
		    "registered": "2016-02-15T05:12:55 -01:00",
		    "latitude": 48.859201,
		    "longitude": 2.375465
		  },
		  {
		    "_id": "56c482eec4d938ce34716049",
		    "picture": "http://placehold.it/32x32",
		    "users": 47,
		    "name": "Hull Mullen FUTURIZE",
		    "address": "779 Fuller Place, Vandiver, Oregon, 9787",
		    "registered": "2016-01-19T03:44:18 -01:00",
		    "latitude": 48.856279,
		    "longitude": 2.379354
		  },
		  {
		    "_id": "56c482eec90a84a0004042dc",
		    "picture": "http://placehold.it/32x32",
		    "users": 162,
		    "name": "Lolita Eaton DANCERITY",
		    "address": "193 Tompkins Place, Utting, Wisconsin, 4082",
		    "registered": "2016-02-11T07:28:38 -01:00",
		    "latitude": 48.855789,
		    "longitude": 2.373747
		  },
		  {
		    "_id": "56c482eef4fb66a29151af5f",
		    "picture": "http://placehold.it/32x32",
		    "users": 159,
		    "name": "Whitehead Norton EQUITOX",
		    "address": "571 Imlay Street, Blairstown, Northern Mariana Islands, 2354",
		    "registered": "2016-01-04T01:33:56 -01:00",
		    "latitude": 48.853564,
		    "longitude": 2.376008
		  },
		  {
		    "_id": "56c482eeecfdfece05cf69bd",
		    "picture": "http://placehold.it/32x32",
		    "users": 180,
		    "name": "Gay Wells ORBOID",
		    "address": "607 Gates Avenue, Indio, Nebraska, 8819",
		    "registered": "2016-01-26T12:08:12 -01:00",
		    "latitude": 48.853766,
		    "longitude": 2.37421
		  },
		  {
		    "_id": "56c482eed52c6d4f6b492569",
		    "picture": "http://placehold.it/32x32",
		    "users": 104,
		    "name": "Mable Castaneda LUNCHPAD",
		    "address": "295 Rockaway Avenue, Jamestown, Illinois, 6223",
		    "registered": "2016-01-01T11:59:24 -01:00",
		    "latitude": 48.850717,
		    "longitude": 2.372445
		  },
		  {
		    "_id": "56c482ee22480be2f4a784c3",
		    "picture": "http://placehold.it/32x32",
		    "users": 149,
		    "name": "Tamra Perkins ACCUFARM",
		    "address": "697 Bills Place, Westwood, Oklahoma, 2918",
		    "registered": "2016-02-09T02:01:21 -01:00",
		    "latitude": 48.859054,
		    "longitude": 2.379212
		  },
		  {
		    "_id": "56c482ee37605e573291a385",
		    "picture": "http://placehold.it/32x32",
		    "users": 75,
		    "name": "Obrien Phillips CONJURICA",
		    "address": "787 Madeline Court, Steinhatchee, Washington, 8876",
		    "registered": "2016-01-22T03:29:38 -01:00",
		    "latitude": 48.852107,
		    "longitude": 2.376795
		  },
		  {
		    "_id": "56c482ee3c8d13ff99e859fd",
		    "picture": "http://placehold.it/32x32",
		    "users": 177,
		    "name": "Sheryl Buckley CAPSCREEN",
		    "address": "202 Front Street, Savannah, Maryland, 1036",
		    "registered": "2016-02-06T06:54:06 -01:00",
		    "latitude": 48.853913,
		    "longitude": 2.378328
		  },
		  {
		    "_id": "56c482ee552452b8d9a0609d",
		    "picture": "http://placehold.it/32x32",
		    "users": 12,
		    "name": "Lyons Taylor MUSAPHICS",
		    "address": "773 Hoyts Lane, Germanton, American Samoa, 1299",
		    "registered": "2016-01-20T10:09:44 -01:00",
		    "latitude": 48.853662,
		    "longitude": 2.377666
		  },
		  {
		    "_id": "56c482ee8939ef8ec1ed6753",
		    "picture": "http://placehold.it/32x32",
		    "users": 83,
		    "name": "Gibson Gross EMTRAC",
		    "address": "422 Bayview Place, Tetherow, Delaware, 1488",
		    "registered": "2016-01-14T11:50:28 -01:00",
		    "latitude": 48.859318,
		    "longitude": 2.375836
		  },
		  {
		    "_id": "56c482eea750fbbd0e0071de",
		    "picture": "http://placehold.it/32x32",
		    "users": 141,
		    "name": "Mason Branch GROK",
		    "address": "497 Cooke Court, Bendon, Kentucky, 5842",
		    "registered": "2016-01-30T02:28:26 -01:00",
		    "latitude": 48.85899,
		    "longitude": 2.378966
		  },
		  {
		    "_id": "56c482ee8a70f45fd4b7accd",
		    "picture": "http://placehold.it/32x32",
		    "users": 139,
		    "name": "Riley Huffman ZENTIA",
		    "address": "676 Hastings Street, Malott, New Mexico, 4070",
		    "registered": "2016-01-22T07:42:57 -01:00",
		    "latitude": 48.850038,
		    "longitude": 2.373232
		  },
		  {
		    "_id": "56c482eed978183c5909931a",
		    "picture": "http://placehold.it/32x32",
		    "users": 98,
		    "name": "Whitley Merrill ZAYA",
		    "address": "385 Stockholm Street, Singer, Puerto Rico, 4954",
		    "registered": "2016-01-23T09:26:13 -01:00",
		    "latitude": 48.853727,
		    "longitude": 2.371895
		  },
		  {
		    "_id": "56c482ee0765ad2f66e2a70a",
		    "picture": "http://placehold.it/32x32",
		    "users": 142,
		    "name": "Johanna Haley DIGIPRINT",
		    "address": "274 Wythe Avenue, Cavalero, Pennsylvania, 3267",
		    "registered": "2016-01-30T12:19:24 -01:00",
		    "latitude": 48.851992,
		    "longitude": 2.371555
		  },
		  {
		    "_id": "56c482eef65d1bac427daadb",
		    "picture": "http://placehold.it/32x32",
		    "users": 183,
		    "name": "Jackie Key ORBAXTER",
		    "address": "834 Vandervoort Place, Rosine, Maine, 5725",
		    "registered": "2016-01-08T09:21:06 -01:00",
		    "latitude": 48.857883,
		    "longitude": 2.371422
		  },
		  {
		    "_id": "56c482ee39dee75c64527b47",
		    "picture": "http://placehold.it/32x32",
		    "users": 31,
		    "name": "Olga Fowler MINGA",
		    "address": "124 Kansas Place, Oceola, Tennessee, 3281",
		    "registered": "2016-01-18T04:16:08 -01:00",
		    "latitude": 48.856397,
		    "longitude": 2.378036
		  },
		  {
		    "_id": "56c482ee82096953eefe7b5a",
		    "picture": "http://placehold.it/32x32",
		    "users": 194,
		    "name": "Rebecca Wagner ZOLAVO",
		    "address": "786 Keap Street, Sandston, Connecticut, 3298",
		    "registered": "2016-02-12T11:40:37 -01:00",
		    "latitude": 48.855837,
		    "longitude": 2.374613
		  },
		  {
		    "_id": "56c482ee4463f9a622040c76",
		    "picture": "http://placehold.it/32x32",
		    "users": 22,
		    "name": "Ayala Woodard ECOSYS",
		    "address": "372 Wyckoff Street, Nadine, New Jersey, 8251",
		    "registered": "2016-01-22T01:37:01 -01:00",
		    "latitude": 48.858295,
		    "longitude": 2.374056
		  },
		  {
		    "_id": "56c482ee0f450361517939e7",
		    "picture": "http://placehold.it/32x32",
		    "users": 15,
		    "name": "Black Lawrence LIQUIDOC",
		    "address": "126 Oceanic Avenue, Rutherford, Arkansas, 4187",
		    "registered": "2016-01-16T08:41:27 -01:00",
		    "latitude": 48.854939,
		    "longitude": 2.378887
		  },
		  {
		    "_id": "56c482eed38c2b064ae8ef31",
		    "picture": "http://placehold.it/32x32",
		    "users": 73,
		    "name": "Monique Doyle XOGGLE",
		    "address": "612 Lake Street, Ballico, Utah, 1782",
		    "registered": "2016-02-12T08:33:29 -01:00",
		    "latitude": 48.851879,
		    "longitude": 2.371596
		  }
		],
		create: function () {
			this.io = require('socket.io')(app.server._server);
			this.listen();
		},

		listen: function () {
			this.io.sockets.on('connection', function (socket) {

				socket.on('chatRoomGet', function() {
				    app.socket.io.emit('chatRoomGet', app.socket.chatRooms);
				    // this.emit('nouveau_client', {'pseudo':pseudo, 'users':app.socket.users});
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