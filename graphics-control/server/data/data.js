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
            console.log(data);
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

loadData();

module.exports.addPlayer = function(team, player) {

}

module.exports.removePlayer = function(team, playerId) {

}

module.exports.setPlaying = function(team, playerId) {

}
