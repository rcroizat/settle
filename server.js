var express = require('express'),
    exp = express()
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');

module.exports = function(app) {
    'use strict';

    return {

        _server: null,
        _db:null,

        // Create the server
        create: function() {
            this._server = http.createServer(exp);
            this.config();
            this.route();
            this.listen();
        },
        // Set the server to listen on the 8080 port if it's in prod or to 3000 if it's in dev environment
        listen: function() {
            var port = 8080;
            if (app.mode === 'dev') {
                port = 3000;
            }
            this._server.listen(port);
        },
        // Configure the app
        config: function() {
            // Set the views pathname to the views folder
            exp.set('views', path.join(__dirname, 'views'));
            // Set the view engine to use Twig
            exp.set('view engine', 'twig');
            // middleware used for going over POST request data, parse it into json on put it on req.body
            exp.use(bodyParser.json());
            exp.use(bodyParser.urlencoded({ extended: false }));
            // middleware that parse cookie header and populate req.cookies
            exp.use(cookieParser());
            // compression middleware that enable deflate and gzip
            exp.use(compression());
            // Set the directory that will serve the front end files
            exp.use(express.static(path.join(__dirname, 'public')));
        },

        route: function() {
            exp.get('/', function(req, res, next) {
                res.render('index', { title: 'Settle' });
            });
            exp.get('/map', function(req, res, next) {
                res.render('map', { title: 'Rooms' });
            });
            exp.get('/room/create', function(req, res, next) {
                res.render('create', { title: 'Créer une chat room' });
            });
            exp.post('/room/create', function(req, res, next) {
                // get the param from the request
                var name = req.body.name;
                var description = req.body.description;
                var friendId = req.body.friendId;
                var userName = req.body.userName;
                var userId = req.body.userId;
                var latitude = req.body.latitude;
                var longitude = req.body.longitude;

                // Create the new chat room then redirect the user to the freshly created room
                app.rooms.insertChatRoom(userName, userId, name, description, latitude, longitude, friendId, function(data){
                    var roomId = data.insertedIds;
                    res.redirect('/room/' + roomId);
                });
            });

            // Get the room data from the db with the associated id then render the page
            exp.get('/room/:id', function(req, res, next) {
                var id = req.params.id;
                var ObjectId = require('mongodb').ObjectID;

                app.rooms.findChatRoom({ "_id": ObjectId(id) }, function(chatRoom) {
                    res.render('room', { title: chatRoom.name, room: chatRoom });
                });
            });
        }
    }
}
