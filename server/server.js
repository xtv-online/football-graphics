'use strict';

var server = require('http').createServer();
var serverConfig = require('../config/server.config');
var fs = require('fs');

// Express Config

var express = require('express');
var app = express();
var port = process.env.PORT || serverConfig.port;
var morgan = require('morgan');
var bodyParser = require('body-parser');

if (serverConfig.logging) {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});

fs.readdirSync(__dirname + '/routes').forEach(function (route) {
    app.use(require('./routes/' + route));
});

server.on('request', app);

// Web Sockets Config

var socketServer = require('./webSockets');
socketServer.connect(server);

fs.readdirSync(__dirname + '/websockets').forEach(function (websocketController) {
    require('./websockets/' + websocketController)(socketServer);
});

// Start Server Listening

server.listen(port, function() {
    console.log('Listening on ' + server.address().port);
});
