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
		    "_id": "56c48b151e6a91b09e802f35",
		    "picture": "http://placehold.it/32x32",
		    "users": 195,
		    "name": "Holmes COSMETEX",
		    "address": "618 Bushwick Court, Helen, District Of Columbia, 7976",
		    "registered": "2016-01-12T04:09:11 -01:00",
		    "latitude": 48.856894,
		    "longitude": 2.370497
		  },
		  {
		    "_id": "56c48b15594bc69a781ea900",
		    "picture": "http://placehold.it/32x32",
		    "users": 88,
		    "name": "Walters MIRACLIS",
		    "address": "304 Cortelyou Road, Walland, New Hampshire, 4654",
		    "registered": "2016-01-22T02:58:40 -01:00",
		    "latitude": 48.850227,
		    "longitude": 2.372221
		  },
		  {
		    "_id": "56c48b153ede7b94f371afb5",
		    "picture": "http://placehold.it/32x32",
		    "users": 135,
		    "name": "Montgomery INSURON",
		    "address": "415 Ridgewood Place, Escondida, Vermont, 3031",
		    "registered": "2016-01-13T08:07:16 -01:00",
		    "latitude": 48.854769,
		    "longitude": 2.37876
		  },
		  {
		    "_id": "56c48b15b5f2fd0d033337fd",
		    "picture": "http://placehold.it/32x32",
		    "users": 82,
		    "name": "Horn ASSURITY",
		    "address": "640 Florence Avenue, Loyalhanna, Massachusetts, 3522",
		    "registered": "2016-02-08T11:09:02 -01:00",
		    "latitude": 48.859233,
		    "longitude": 2.376629
		  },
		  {
		    "_id": "56c48b150097321bdaa352ff",
		    "picture": "http://placehold.it/32x32",
		    "users": 80,
		    "name": "Crawford GEOFORMA",
		    "address": "954 Havemeyer Street, Websterville, Mississippi, 6179",
		    "registered": "2016-02-05T07:01:22 -01:00",
		    "latitude": 48.857554,
		    "longitude": 2.370156
		  },
		  {
		    "_id": "56c48b15156d297a29b70526",
		    "picture": "http://placehold.it/32x32",
		    "users": 104,
		    "name": "Estes ISIS",
		    "address": "235 Revere Place, Hondah, Arkansas, 2922",
		    "registered": "2016-02-10T07:06:33 -01:00",
		    "latitude": 48.856095,
		    "longitude": 2.372142
		  },
		  {
		    "_id": "56c48b15e664f9c5ed37d261",
		    "picture": "http://placehold.it/32x32",
		    "users": 58,
		    "name": "Hopper DOGTOWN",
		    "address": "962 Bushwick Place, Cherokee, New Mexico, 1271",
		    "registered": "2016-01-06T04:34:19 -01:00",
		    "latitude": 48.855618,
		    "longitude": 2.377739
		  },
		  {
		    "_id": "56c48b156a6713b68be17852",
		    "picture": "http://placehold.it/32x32",
		    "users": 8,
		    "name": "Collier GOGOL",
		    "address": "293 Heath Place, Winchester, Utah, 1281",
		    "registered": "2016-02-11T06:49:37 -01:00",
		    "latitude": 48.854121,
		    "longitude": 2.371167
		  },
		  {
		    "_id": "56c48b15c9900d4b686da2ab",
		    "picture": "http://placehold.it/32x32",
		    "users": 66,
		    "name": "Barrera INTRADISK",
		    "address": "970 Waldorf Court, Frizzleburg, Delaware, 5846",
		    "registered": "2016-01-01T01:19:37 -01:00",
		    "latitude": 48.850388,
		    "longitude": 2.371073
		  },
		  {
		    "_id": "56c48b152abe42a606cacb4d",
		    "picture": "http://placehold.it/32x32",
		    "users": 134,
		    "name": "Vance ULTRIMAX",
		    "address": "169 Sands Street, Wikieup, Guam, 2206",
		    "registered": "2016-02-07T01:28:29 -01:00",
		    "latitude": 48.850629,
		    "longitude": 2.370604
		  },
		  {
		    "_id": "56c48b1536891ba5a85bb690",
		    "picture": "http://placehold.it/32x32",
		    "users": 180,
		    "name": "Davis GRAINSPOT",
		    "address": "152 Devoe Street, Beaverdale, Alaska, 407",
		    "registered": "2016-01-26T09:49:27 -01:00",
		    "latitude": 48.850473,
		    "longitude": 2.37456
		  },
		  {
		    "_id": "56c48b151141652452715f8e",
		    "picture": "http://placehold.it/32x32",
		    "users": 70,
		    "name": "Blackburn FLEETMIX",
		    "address": "957 Barlow Drive, Harleigh, Oklahoma, 1522",
		    "registered": "2016-01-25T06:46:37 -01:00",
		    "latitude": 48.858941,
		    "longitude": 2.372869
		  },
		  {
		    "_id": "56c48b151d17272c0ab7897c",
		    "picture": "http://placehold.it/32x32",
		    "users": 154,
		    "name": "Albert ISOSPHERE",
		    "address": "264 Brevoort Place, Brambleton, Federated States Of Micronesia, 4366",
		    "registered": "2016-01-26T12:29:46 -01:00",
		    "latitude": 48.850391,
		    "longitude": 2.375473
		  },
		  {
		    "_id": "56c48b154802176fd6a0c41b",
		    "picture": "http://placehold.it/32x32",
		    "users": 147,
		    "name": "Barlow ELPRO",
		    "address": "335 Dean Street, Fairhaven, Nevada, 3840",
		    "registered": "2016-01-19T06:57:23 -01:00",
		    "latitude": 48.858514,
		    "longitude": 2.378315
		  },
		  {
		    "_id": "56c48b15a5e210c94c1d5acc",
		    "picture": "http://placehold.it/32x32",
		    "users": 35,
		    "name": "Wallace HOUSEDOWN",
		    "address": "433 McKinley Avenue, Blodgett, Washington, 5310",
		    "registered": "2016-01-12T02:05:31 -01:00",
		    "latitude": 48.850781,
		    "longitude": 2.377512
		  },
		  {
		    "_id": "56c48b150d33807ee7f2e40b",
		    "picture": "http://placehold.it/32x32",
		    "users": 169,
		    "name": "Dickson ONTAGENE",
		    "address": "967 Baycliff Terrace, Edenburg, North Carolina, 2396",
		    "registered": "2016-01-30T04:10:12 -01:00",
		    "latitude": 48.850559,
		    "longitude": 2.377834
		  },
		  {
		    "_id": "56c48b15a6eb1b2aca5b01d1",
		    "picture": "http://placehold.it/32x32",
		    "users": 68,
		    "name": "Foley ZILLAR",
		    "address": "491 Billings Place, Calpine, Indiana, 7497",
		    "registered": "2016-01-07T07:42:23 -01:00",
		    "latitude": 48.852134,
		    "longitude": 2.374296
		  },
		  {
		    "_id": "56c48b152821c220175615a8",
		    "picture": "http://placehold.it/32x32",
		    "users": 109,
		    "name": "Rodgers SUREPLEX",
		    "address": "830 Juliana Place, Mappsville, American Samoa, 6480",
		    "registered": "2016-02-17T11:39:59 -01:00",
		    "latitude": 48.85411,
		    "longitude": 2.377279
		  },
		  {
		    "_id": "56c48b15d20cdd5ea97f6e85",
		    "picture": "http://placehold.it/32x32",
		    "users": 70,
		    "name": "Levy EXERTA",
		    "address": "228 Humboldt Street, Ronco, Tennessee, 4670",
		    "registered": "2016-01-17T09:50:47 -01:00",
		    "latitude": 48.85781,
		    "longitude": 2.376888
		  },
		  {
		    "_id": "56c48b15b6a75240c253a6b2",
		    "picture": "http://placehold.it/32x32",
		    "users": 51,
		    "name": "Acevedo PARAGONIA",
		    "address": "504 Sedgwick Street, Trail, Maine, 7270",
		    "registered": "2016-02-13T02:54:56 -01:00",
		    "latitude": 48.855136,
		    "longitude": 2.375576
		  },
		  {
		    "_id": "56c48b15d0351e63bee8d933",
		    "picture": "http://placehold.it/32x32",
		    "users": 59,
		    "name": "Harris MELBACOR",
		    "address": "916 Suydam Street, Rivereno, Rhode Island, 8703",
		    "registered": "2016-01-01T10:53:06 -01:00",
		    "latitude": 48.855676,
		    "longitude": 2.374815
		  },
		  {
		    "_id": "56c48b1527511de369ebbb51",
		    "picture": "http://placehold.it/32x32",
		    "users": 118,
		    "name": "Petty VALREDA",
		    "address": "311 Hausman Street, Wollochet, Arizona, 7728",
		    "registered": "2016-01-30T09:43:20 -01:00",
		    "latitude": 48.855534,
		    "longitude": 2.373562
		  },
		  {
		    "_id": "56c48b1580210baa03ea7127",
		    "picture": "http://placehold.it/32x32",
		    "users": 157,
		    "name": "Byers SHEPARD",
		    "address": "567 Meadow Street, Thatcher, Georgia, 2841",
		    "registered": "2016-01-25T02:44:57 -01:00",
		    "latitude": 48.854133,
		    "longitude": 2.373447
		  },
		  {
		    "_id": "56c48b15c36b5ce3fc189ddc",
		    "picture": "http://placehold.it/32x32",
		    "users": 40,
		    "name": "Mosley DAYCORE",
		    "address": "951 Jamison Lane, Goldfield, Maryland, 972",
		    "registered": "2016-01-11T05:13:25 -01:00",
		    "latitude": 48.85194,
		    "longitude": 2.374675
		  },
		  {
		    "_id": "56c48b1561abf7ef6c2c4889",
		    "picture": "http://placehold.it/32x32",
		    "users": 68,
		    "name": "Macias STOCKPOST",
		    "address": "543 Kingsland Avenue, Welda, Hawaii, 6118",
		    "registered": "2016-01-24T10:54:39 -01:00",
		    "latitude": 48.858022,
		    "longitude": 2.374186
		  },
		  {
		    "_id": "56c48b1551030edae9d46a29",
		    "picture": "http://placehold.it/32x32",
		    "users": 194,
		    "name": "Gay QUONATA",
		    "address": "460 Butler Place, Craig, Palau, 1496",
		    "registered": "2016-02-08T02:45:41 -01:00",
		    "latitude": 48.855831,
		    "longitude": 2.371851
		  },
		  {
		    "_id": "56c48b150ba5c26731bfec8d",
		    "picture": "http://placehold.it/32x32",
		    "users": 196,
		    "name": "Gentry DELPHIDE",
		    "address": "453 Moore Place, Curtice, Kentucky, 1448",
		    "registered": "2016-01-03T04:38:31 -01:00",
		    "latitude": 48.856498,
		    "longitude": 2.375314
		  },
		  {
		    "_id": "56c48b15022bb512da6a33eb",
		    "picture": "http://placehold.it/32x32",
		    "users": 94,
		    "name": "Short QUILTIGEN",
		    "address": "800 Schaefer Street, Summerset, South Dakota, 8185",
		    "registered": "2016-02-05T02:10:04 -01:00",
		    "latitude": 48.852257,
		    "longitude": 2.378577
		  },
		  {
		    "_id": "56c48b15f26a7d19dfbedcf8",
		    "picture": "http://placehold.it/32x32",
		    "users": 102,
		    "name": "Arnold SONGLINES",
		    "address": "611 Tech Place, Hinsdale, Michigan, 1739",
		    "registered": "2016-02-09T10:24:21 -01:00",
		    "latitude": 48.853235,
		    "longitude": 2.379357
		  },
		  {
		    "_id": "56c48b1500577eab44580712",
		    "picture": "http://placehold.it/32x32",
		    "users": 72,
		    "name": "Mcleod EXOSPACE",
		    "address": "347 Maujer Street, Kent, Puerto Rico, 4547",
		    "registered": "2016-02-13T05:40:51 -01:00",
		    "latitude": 48.850782,
		    "longitude": 2.37593
		  },
		  {
		    "_id": "56c48b150881827e4113d27f",
		    "picture": "http://placehold.it/32x32",
		    "users": 194,
		    "name": "Black SOLAREN",
		    "address": "345 Arlington Place, Broadlands, Minnesota, 9594",
		    "registered": "2016-01-22T12:41:20 -01:00",
		    "latitude": 48.859479,
		    "longitude": 2.378963
		  },
		  {
		    "_id": "56c48b15fccf33017869ab06",
		    "picture": "http://placehold.it/32x32",
		    "users": 83,
		    "name": "Beach ICOLOGY",
		    "address": "937 Cleveland Street, Dunnavant, North Dakota, 5513",
		    "registered": "2016-02-16T03:26:39 -01:00",
		    "latitude": 48.855888,
		    "longitude": 2.37503
		  },
		  {
		    "_id": "56c48b15e171c15e09c8d146",
		    "picture": "http://placehold.it/32x32",
		    "users": 106,
		    "name": "Petersen DOGNOSIS",
		    "address": "953 Colin Place, Norris, Connecticut, 2690",
		    "registered": "2016-01-11T02:00:08 -01:00",
		    "latitude": 48.854141,
		    "longitude": 2.373235
		  },
		  {
		    "_id": "56c48b1543dc221f758645c6",
		    "picture": "http://placehold.it/32x32",
		    "users": 74,
		    "name": "Lott ZAYA",
		    "address": "834 Main Street, Celeryville, Virginia, 4685",
		    "registered": "2016-01-27T04:17:43 -01:00",
		    "latitude": 48.85278,
		    "longitude": 2.370316
		  },
		  {
		    "_id": "56c48b15576daaa26ecb3a5c",
		    "picture": "http://placehold.it/32x32",
		    "users": 45,
		    "name": "Shaffer INCUBUS",
		    "address": "853 Aberdeen Street, Stonybrook, Wisconsin, 2919",
		    "registered": "2016-01-21T10:30:33 -01:00",
		    "latitude": 48.853464,
		    "longitude": 2.370184
		  },
		  {
		    "_id": "56c48b1547f7b4c0adea4ef6",
		    "picture": "http://placehold.it/32x32",
		    "users": 90,
		    "name": "Parker XANIDE",
		    "address": "388 Lynch Street, Moscow, West Virginia, 9624",
		    "registered": "2016-02-02T02:13:54 -01:00",
		    "latitude": 48.854956,
		    "longitude": 2.371447
		  },
		  {
		    "_id": "56c48b15e1261d2d2ce42b83",
		    "picture": "http://placehold.it/32x32",
		    "users": 102,
		    "name": "Estrada SLUMBERIA",
		    "address": "914 Apollo Street, Canoochee, New York, 1352",
		    "registered": "2016-02-02T11:23:35 -01:00",
		    "latitude": 48.859987,
		    "longitude": 2.378978
		  },
		  {
		    "_id": "56c48b15c426a5db96873aad",
		    "picture": "http://placehold.it/32x32",
		    "users": 91,
		    "name": "Aguilar MAGNINA",
		    "address": "460 Degraw Street, Yogaville, Alabama, 7903",
		    "registered": "2016-01-14T06:36:56 -01:00",
		    "latitude": 48.859961,
		    "longitude": 2.37083
		  },
		  {
		    "_id": "56c48b155fd726f05ddc63c3",
		    "picture": "http://placehold.it/32x32",
		    "users": 16,
		    "name": "Griffin BOSTONIC",
		    "address": "831 Stratford Road, Frierson, Wyoming, 5167",
		    "registered": "2016-01-16T11:41:54 -01:00",
		    "latitude": 48.858493,
		    "longitude": 2.378522
		  },
		  {
		    "_id": "56c48b15045d3142197cef43",
		    "picture": "http://placehold.it/32x32",
		    "users": 41,
		    "name": "Mccarthy GEEKETRON",
		    "address": "687 Woodpoint Road, Chapin, Pennsylvania, 7522",
		    "registered": "2016-02-01T05:43:19 -01:00",
		    "latitude": 48.851369,
		    "longitude": 2.377419
		  },
		  {
		    "_id": "56c48b157c4e4790b865d760",
		    "picture": "http://placehold.it/32x32",
		    "users": 182,
		    "name": "Franklin VERTON",
		    "address": "592 Hinsdale Street, Conestoga, Florida, 1129",
		    "registered": "2016-02-03T07:24:35 -01:00",
		    "latitude": 48.854816,
		    "longitude": 2.378704
		  },
		  {
		    "_id": "56c48b15320efcade18dad27",
		    "picture": "http://placehold.it/32x32",
		    "users": 123,
		    "name": "Harrington INSURITY",
		    "address": "290 Williams Avenue, Kersey, Texas, 7405",
		    "registered": "2016-01-19T11:54:46 -01:00",
		    "latitude": 48.859802,
		    "longitude": 2.379212
		  },
		  {
		    "_id": "56c48b15e486ecb24a41d7ab",
		    "picture": "http://placehold.it/32x32",
		    "users": 63,
		    "name": "Stewart XERONK",
		    "address": "522 Rockwell Place, Kidder, Colorado, 9983",
		    "registered": "2016-01-06T10:56:46 -01:00",
		    "latitude": 48.850148,
		    "longitude": 2.374499
		  },
		  {
		    "_id": "56c48b15c957f2786fba1130",
		    "picture": "http://placehold.it/32x32",
		    "users": 186,
		    "name": "Church EARTHPURE",
		    "address": "198 Rochester Avenue, Goodville, Iowa, 3344",
		    "registered": "2016-02-08T05:33:47 -01:00",
		    "latitude": 48.85614,
		    "longitude": 2.377082
		  },
		  {
		    "_id": "56c48b15d0814d59a9a02b29",
		    "picture": "http://placehold.it/32x32",
		    "users": 86,
		    "name": "Baldwin SCENTRIC",
		    "address": "544 Madison Street, Chesterfield, Virgin Islands, 4682",
		    "registered": "2016-02-02T10:19:22 -01:00",
		    "latitude": 48.851371,
		    "longitude": 2.373969
		  },
		  {
		    "_id": "56c48b156b9724ace70c36e0",
		    "picture": "http://placehold.it/32x32",
		    "users": 180,
		    "name": "Fulton KANGLE",
		    "address": "848 Carroll Street, Needmore, Northern Mariana Islands, 6795",
		    "registered": "2016-01-20T03:19:35 -01:00",
		    "latitude": 48.850328,
		    "longitude": 2.377875
		  },
		  {
		    "_id": "56c48b1506a70294b845c6d4",
		    "picture": "http://placehold.it/32x32",
		    "users": 138,
		    "name": "Heath KOZGENE",
		    "address": "278 Greenwood Avenue, Brandywine, Louisiana, 5577",
		    "registered": "2016-01-25T05:31:37 -01:00",
		    "latitude": 48.851983,
		    "longitude": 2.378933
		  },
		  {
		    "_id": "56c48b15462ee94c82a67bd3",
		    "picture": "http://placehold.it/32x32",
		    "users": 149,
		    "name": "Hernandez GYNK",
		    "address": "422 Dakota Place, Osmond, California, 8583",
		    "registered": "2016-01-05T08:03:24 -01:00",
		    "latitude": 48.852286,
		    "longitude": 2.375741
		  },
		  {
		    "_id": "56c48b15a0d93602fbfbdc0e",
		    "picture": "http://placehold.it/32x32",
		    "users": 155,
		    "name": "Conner IPLAX",
		    "address": "390 Hart Place, Sisquoc, Nebraska, 9378",
		    "registered": "2016-01-13T10:10:27 -01:00",
		    "latitude": 48.858418,
		    "longitude": 2.372311
		  },
		  {
		    "_id": "56c48b152afa1e6216118804",
		    "picture": "http://placehold.it/32x32",
		    "users": 183,
		    "name": "Wooten MARQET",
		    "address": "832 Union Street, Jessie, Marshall Islands, 5821",
		    "registered": "2016-01-16T10:46:12 -01:00",
		    "latitude": 48.852175,
		    "longitude": 2.370787
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