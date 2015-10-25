'use strict';

angular.module('app')
    .service('ScoreCounterSvc', function (WebSocketSvc) {
        var namespace = 'scoreCounter';

        this.updateData = function () {
            WebSocketSvc.sendMessage(namespace, 'requestData', null);
        };

        this.getUpdates = function (callback) {
            WebSocketSvc.listen(namespace, 'scoreData', function (data) {
                callback(data);
            });
        };

        this.incrementHome = function () {
            WebSocketSvc.sendMessage(namespace, 'incrementHome', null);
        };

        this.decrementHome = function () {
            WebSocketSvc.sendMessage(namespace, 'decrementHome', null);
        };

        this.incrementGuest = function () {
            WebSocketSvc.sendMessage(namespace, 'incrementGuest', null);
        };

        this.decrementGuest = function () {
            WebSocketSvc.sendMessage(namespace, 'decrementGuest', null);
        };

        this.resetScore = function () {
            WebSocketSvc.sendMessage(namespace, 'resetScore', null);
        };

    });
