'use strict';

angular.module('app')
    .service('GraphicsSvc', function (WebSocketSvc) {
        var namespace = 'graphics';

        this.score = function (teamData, playerData) {
            WebSocketSvc.sendMessage(namespace, 'score', {
                'playerData': playerData,
                'teamData': teamData
            });
        };

        this.redCard = function (teamData, playerData) {
            WebSocketSvc.sendMessage(namespace, 'redCard', {
                'playerData': playerData,
                'teamData': teamData
            });
        };

        this.yellowCard = function (teamData, playerData) {
            WebSocketSvc.sendMessage(namespace, 'yellowCard', {
                'playerData': playerData,
                'teamData': teamData
            });
        };

        this.penalty = function (teamData) {
            WebSocketSvc.sendMessage(namespace, 'penalty', {
                'teamData': teamData
            });
        };

        this.corner = function (teamData) {
            WebSocketSvc.sendMessage(namespace, 'corner', {
                'teamData': teamData
            });
        };

        this.substitution = function (teamData, on, off) {
            WebSocketSvc.sendMessage(namespace, 'penalty', {
                'teamData': teamData,
                'on': on,
                'off': off
            });
        };

        this.genericLt = function (name, description, teamData) {
            WebSocketSvc.sendMessage(namespace, 'penalty', {
                'teamData': teamData,
                'name': name,
                'description': description
            });
        };

    });
