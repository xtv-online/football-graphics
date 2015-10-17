'use strict';

var _ = require('lodash');
var ws = require('ws');

var clients = [];
var wss;

exports.connect = function(server) {
    wss = new ws.Server({
        server: server
    });
    wss.on('connection', function(ws) {
        clients.push(ws);
        ws.on('close', function() {
            _.remove(clients, ws);
        });
    });
    wss.setMaxListeners(100);
};

exports.broadcast = function(namespace, instruction, data) {
    var json = JSON.stringify({
        namespace: namespace,
        instruction: instruction,
        data: data
    });
    clients.forEach(function(client) {
        client.send(json);
    });
};

exports.listen = function(namespace, instruction, callback) {
    wss.on('connection', function(ws) {
        ws.setMaxListeners(100);
        ws.on('message', function(message) {
            var messageData = JSON.parse(message);

            if (messageData.namespace === namespace) {
                if (messageData.instruction === instruction) {
                    callback(messageData.data);
                }
            }
        });
    });
};
