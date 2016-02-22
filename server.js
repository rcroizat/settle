var express = require('express'),
	exp = express()
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Twig  = require('twig');
var twig = Twig.twig;

module.exports = function(app) {
    'use strict';

    return {

        _server: null,
        create: function() {

            this._server = http.createServer(exp);
            this.route();
            this.listen();
        },

        listen: function() {
        	var port = 8080;
        	if (app.mode === 'dev') {
        		port = 3000;
        	}
        	console.log(app.mode);
        	console.log(port);
            this._server.listen(port, function() {
                console.log('up and running');
            });
        },

        route: function() {

            exp.set('views', path.join(__dirname, 'views'));
            exp.set('view engine', 'twig');

            exp.use(bodyParser.json());
            exp.use(bodyParser.urlencoded({ extended: false }));
            exp.use(cookieParser());
            exp.use(express.static(path.join(__dirname, 'public')));

            exp.get('/', function(req, res, next) {
			  res.render('index', { title: 'Settle' });
			});

            exp.get('/room/create', function(req, res, next) {
              res.render('create', { title: 'Créér un chat' });
            });

            exp.post('/room/create', function(req, res, next) {
                //creating the room

                var name = req.body.name;
                var description = req.body.description;
                var idr ='';
                app.db.insertChatRoom(name, description, '54564', '564864',  function(data){
                    console.log('idididid  '+data.insertedIds);
                    idr = data.insertedIds;
                });
            res.redirect('/room/'+idr);
            });

            exp.get('/room/:id', function(req, res, next) {
                var id = req.body.id;
                res.render('room', { title: 'Titre de la room' }); /*  On cherche le titre de la room sur mongp (commentaire a sup)*/
            });
            exp.get('/map', function(req, res, next) {
                res.render('map', { title: 'Evénement à proximités' });
            });
            exp.get('/users', function(req, res, next) {
			  res.send('respond with a resource');
			});

        }
    }
}
