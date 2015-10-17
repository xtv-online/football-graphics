'use strict';

var _ = require('lodash');
var jsonFile = require('jsonfile');

var data;
var fileLocation = 'data/db.json';

function loadData() {
    jsonFile.readFile(fileLocation, function(err, fileData) {
        if (err) {
            console.error(err);
            jsonFile.writeFile(fileLocation, data, function(err) {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            data = fileData;
            newDataUpdates();
        }
    });
}

function saveData() {
    jsonFile.writeFile(fileLocation, data, function(err) {
        if (err) {
            console.error(err);
        }
    });
}

var updateListeners = [];

function updateData() {
    saveData();
    newDataUpdates();
}

function newDataUpdates() {
    for (var i = 0; i < updateListeners.length; i++) {
        updateListeners[i](data);
    }
}

module.exports.listenForUpdates = function (callback) {
    updateListeners.push(callback);
}

loadData();

module.exports.requestData = function () {
    newDataUpdates();
    return data;
};

module.exports.addPlayer = function(team, player) {
    if (team === 'home') {
        data.home.players.push(player);
    } else {
        data.guest.players.push(player);
    }
    updateData();
}

module.exports.removePlayer = function(team, playerId) {
    if (team === 'home') {
        data.home.players.splice(playerId, 1);
    } else {
        data.guest.players.splice(playerId, 1);
    }
    updateData();
}

module.exports.setPlaying = function(team, playerId, isPlaying) {
    if (team === 'home') {
        data.home.players[playerId].isPlaying = isPlaying;
    } else {
        data.guest.players[playerId].isPlaying = isPlaying;
    }
    updateData();
}

module.exports.setColour = function (team, colourString) {
    if (team === 'home') {
        data.home.colour = colourString;
    } else {
        data.guest.colour = colourString;
    }
    updateData();
}

module.exports.setName = function (team, name) {
    if (team === 'home') {
        data.home.name = name;
    } else {
        data.guest.name = name;
    }
    updateData();
}
