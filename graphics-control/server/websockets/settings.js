'use strict';

var dataInterface = require('../data/data');
var namespace = 'teamSettings';

module.exports = function(socket) {
    dataInterface.listenForUpdates(function (data) {
        socket.broadcast(namespace, 'newData', data);
    });

    socket.listen(namespace, 'requestData', function () {
        dataInterface.requestData();
    });

    socket.listen(namespace, 'addPlayer', function (data) {
        dataInterface.addPlayer(data.team, data.player);
    });

    socket.listen(namespace, 'removePlayer', function (data) {
        dataInterface.removePlayer(data.team, data.playerId);
    });

    socket.listen(namespace, 'changeTeamName', function (data) {
        dataInterface.setName(data.team, data.name);
    });

    socket.listen(namespace, 'changeTeamColour', function (data) {
        dataInterface.setColour(data.team, data.colour);
    });

    socket.listen(namespace, 'changeShortName', function (data) {
        dataInterface.setShortName(data.team, data.shortName);
    });
};
