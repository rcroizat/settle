var exp = require('express')();
var http = require('http');

module.exports = function () {
	'use strict';

	return{

		_server: null,
		create: function () {
			this._server = http.createServer(exp);
			this.route();
			this.listen();
		},

		listen : function () {
			this._server.listen(8080, function () {
				console.log('up and running');
			});
		},

		route: function () {
			exp.get('/', function (req, res) {
		  		res.sendfile(__dirname + '/index.html');
			}); 
		}
	}
}