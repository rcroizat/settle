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
            this._server.listen(3000, function() {
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
            exp.get('/create', function(req, res, next) {
			  res.render('create', { title: 'Créér un chat' });
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
