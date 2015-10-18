'use strict';

angular.module('app')
    .service('ClockControlSvc', function (WebSocketSvc) {
        var namespace = 'clock';

        this.updateData = function () {
            WebSocketSvc.sendMessage(namespace, 'requestData', null);
        };

        this.getUpdates = function (callback) {
            WebSocketSvc.listen(namespace, 'newData', function (data) {
                callback(data);
            });
        };

        this.startClock = function () {
            WebSocketSvc.sendMessage(namespace, 'startClock', null);
        };

        this.startClock = function () {
            WebSocketSvc.sendMessage(namespace, 'startClock', null);
        };

        this.resetClock = function () {
            WebSocketSvc.sendMessage(namespace, 'resetClock', null);
        };

        this.stopClock = function () {
            WebSocketSvc.sendMessage(namespace, 'stopClock', null);
        };

        this.setClockTime = function (minutes) {
            WebSocketSvc.sendMessage(namespace, 'setClockTime', minutes);
        };

        this.addExtraTime = function (minutes) {
            WebSocketSvc.sendMessage(namespace, 'addExtraTime', minutes);
        };

        this.removeExtraTime = function () {
            WebSocketSvc.sendMessage(namespace, 'removeExtraTime', null);
        };

        this.showClock = function () {
            WebSocketSvc.sendMessage(namespace, 'showClock', null);
        };

        this.hideClock = function () {
            WebSocketSvc.sendMessage(namespace, 'hideClock', null);
        };

    });
