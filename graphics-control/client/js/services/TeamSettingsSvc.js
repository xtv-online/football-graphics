'use strict';

angular.module('app')
    .service('TeamSettingsSvc', function (WebSocketSvc) {
        var namespace = 'teamSettings';

        this.updateData = function () {
            WebSocketSvc.sendMessage(namespace, 'requestData', null);
        };

        this.getUpdates = function (callback) {
            WebSocketSvc.listen(namespace, 'newData', function (data) {
                callback(data);
            });
        };

        this.setPlayerIsPlaying= function (team, playerNumber, isPlaying) {
            var data = {
                'team': team,
                'playerNumber': playerNumber,
                'isPlaying': isPlaying
            };
            WebSocketSvc.sendMessage(namespace, 'setPlaying', data);
        };

        this.addHomePlayer = function (player) {
            var data = {
                'team': 'home',
                'player': player
            };
            WebSocketSvc.sendMessage(namespace, 'addPlayer', data);
        };

        this.addGuestPlayer = function (player) {
            var data = {
                'team': 'guest',
                'player': player
            };
            WebSocketSvc.sendMessage(namespace, 'addPlayer', data);
        };

        this.removeHomePlayer = function (playerId) {
            var data = {
                'team': 'home',
                'playerId': playerId
            };
            WebSocketSvc.sendMessage(namespace, 'removePlayer', data);
        };

        this.removeGuestPlayer = function (playerId) {
            var data = {
                'team': 'guest',
                'playerId': playerId
            };
            WebSocketSvc.sendMessage(namespace, 'removePlayer', data);
        };

        this.changeHomeTeamName = function (name) {
            var data = {
                'team': 'home',
                'name': name
            };
            WebSocketSvc.sendMessage(namespace, 'changeTeamName', data);
        };

        this.changeGuestTeamName = function (name) {
            var data = {
                'team': 'guest',
                'name': name
            };
            WebSocketSvc.sendMessage(namespace, 'changeTeamName', data);
        };

        this.changeHomeTeamColour = function (colour) {
            var data = {
                'team': 'home',
                'colour': colour
            };
            WebSocketSvc.sendMessage(namespace, 'changeTeamColour', data);
        };

        this.changeGuestTeamColour = function (colour) {
            var data = {
                'team': 'guest',
                'colour': colour
            };
            WebSocketSvc.sendMessage(namespace, 'changeTeamColour', data);
        };

        this.changeHomeTeamShortName = function (shortName) {
            var data = {
                'team': 'home',
                'shortName': shortName
            };
            WebSocketSvc.sendMessage(namespace, 'changeShortName', data);
        };

        this.changeGuestTeamShortName = function (shortName) {
            var data = {
                'team': 'guest',
                'shortName': shortName
            };
            WebSocketSvc.sendMessage(namespace, 'changeShortName', data);
        };

    });
