'use strict';

angular.module('app')
    .service('WebSocketSvc', function($rootScope, $interval) {
        function webSocketHost(argument) {
            return 'ws://' + window.location.host;
        }

        var connection;
        var reconnectInterval = null;
        var socketIsConnected = false;
        var messageQueue = [];

        function connect() {
            console.log('Attempting to Connect');
            connection = new WebSocket(webSocketHost());

            connection.onopen = function() {
                console.log('Connected');
                socketIsConnected = true;

                if (reconnectInterval !== null) {
                    $interval.cancel(reconnectInterval);
                    reconnectInterval = null;
                }

                if (messageQueue !== undefined) {
                    if (messageQueue.length > 0) {
                        for (var i = 0; i < messageQueue.length; i++) {
                            connection.send(messageQueue[i]);
                        }
                        messageQueue = undefined;
                    }
                }

                connection.onmessage = listen;
            };

            connection.onclose = function() {
                if (reconnectInterval !== null) {
                    return;
                } else {
                    console.log('Connection Lost');
                    reconnectInterval = $interval(connect, 1000);
                }
            };
        }

        this.connect = connect;

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

        var listeners = [];

        function listen(message) {
            var messageData = JSON.parse(message.data);
            $rootScope.$broadcast('ws:' + messageData.namespace + ':' + messageData.instruction, messageData.data);

            for (var i = 0; i < listeners.length; i++) {
                if (messageData.namespace === listeners[i].namespace) {
                    if (messageData.instruction === listeners[i].instruction) {
                        listeners[i].callback(messageData.data);
                    }
                }
            }
        }

        this.listen = function(namespace, instruction, callback) {
            listeners.push({
                namespace: namespace,
                instruction: instruction,
                callback: callback
            });
        };

    }).run(function(WebSocketSvc) {
        WebSocketSvc.connect();
    });
