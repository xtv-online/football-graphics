'use strict';

var url = 'ws://localhost:3000';
var connection;

var reconnectInterval = null;
var socketIsConnected = false;
var messageQueue = [];
var listeners = [];

function connect() {
    console.log('Attempting to Connect');
    connection = new WebSocket(url);

    connection.onopen = function() {
        console.log('Connected');
        socketIsConnected = true;

        if (reconnectInterval !== null) {
            clearInterval(reconnectInterval);
            reconnectInterval = null;
        }

        if (messageQueue.length > 0) {
            for (var i = 0; i < messageQueue.length; i++) {
                connection.send(messageQueue[i]);
            }
            messageQueue = undefined;
        }

        connection.onmessage = listen;
    }

    connection.onclose = function() {
        if (reconnectInterval !== null) {
            return;
        } else {
            console.log('Connection Lost');
            reconnectInterval = setInterval(connect, 1000);
        }
    }
}

connect();

this.sendMessage = function(namespace, instruction, data) {
    var messageData = {
        'namespace': namespace,
        'instruction': instruction,
        'data': data
    };

    if (socketIsConnected) {
        connection.send(JSON.stringify(messageData));
    } else {
        messageQueue.push(JSON.stringify(messageData));
        console.log('Queued Message');
    }
};

function listen(message) {
    var messageData = JSON.parse(message.data);

    for (var i = 0; i < listeners.length; i++) {
        if (messageData.namespace === listeners[i].namespace) {
            if (messageData.instruction === listeners[i].instruction) {
                listeners[i].callback(messageData.data);
            }
        }
    }
};

this.listenForInstruction = function(namespace, instruction, callback) {
    listeners.push({
        namespace: namespace,
        instruction: instruction,
        callback: callback
    });
};
