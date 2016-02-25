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
        create: function() {

            this._server = http.createServer(exp);
            this.config();
            this.route();
            this.listen();
        },

        listen: function() {
            var port = 8080;
            if (app.mode === 'dev') {
                port = 3000;
            }
            this._server.listen(port);
        },
        config: function() {
            exp.set('views', path.join(__dirname, 'views'));
            exp.set('view engine', 'twig');
            exp.use(bodyParser.json());
            exp.use(bodyParser.urlencoded({ extended: false }));
            exp.use(cookieParser());
            exp.use(compression());
            exp.use(express.static(path.join(__dirname, 'public')));
        },

        route: function() {
            exp.get('/', function(req, res, next) {
                res.render('index', { title: 'Settle' });
            });
            exp.get('/map', function(req, res, next) {
                res.render('map', { title: 'Evénement à proximités' });
            });
            exp.get('/room/create', function(req, res, next) {
                res.render('create', { title: 'Créer un chat' });
            });
            exp.post('/room/create', function(req, res, next) {
                //creating the room
                var name = req.body.name;
                var description = req.body.description;
                var friendId = req.body.friendId;
                var latitude = req.body.latitude;
                var longitude = req.body.longitude;
                app.rooms.insertChatRoom(name, description, latitude, longitude, friendId, function(data) {
                    var roomId = data.insertedIds;
                    res.redirect('/room/' + roomId);
                });
            });
            exp.get('/room/:id', function(req, res, next) {
                var id = req.params.id;
                app.rooms.findChatRoom(id, function(chatRoom) {
                    res.render('room', { title: chatRoom.name, room: chatRoom });
                });

            });
        }
    }
}
