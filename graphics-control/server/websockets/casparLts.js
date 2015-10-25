'use strict';

var namespace = 'graphics';

module.exports = function (socket) {
    // Player Scores - Player Data + Team Data
    socket.listen(namespace, "score", function (data) {
        console.log("Player Scored", data.teamData, data.playerData);

        //Exeter &nbsp;&nbsp;1&nbs
        //&nbsp;2&nbsp;&nbsp; Bath

    });

    // Red Card - Player Data + Team Data
    socket.listen(namespace, 'redCard', function (data) {
        var msgData = {
            "text1":data.playerData.number + " " + data.playerData.name,
            "colour1": data.teamData.colour
        };
        socket.broadcast(namespace, "redCard", msgData);
    });

    // Yellow Card - Player Data + Team Data
    socket.listen(namespace, "yellowCard", function (data) {
        var msgData = {
            "text1":data.playerData.number + " " + data.playerData.name,
            "colour1": data.teamData.colour
        };
        socket.broadcast(namespace, "yellowCard", msgData);
    });

    // Penalty - Team Data
    socket.listen(namespace, "penalty", function (data) {
        var msgData = {
            "text2":data.teamData.name,
            "text1":"Penalty",
            "colour1": data.teamData.colour
        };
        socket.broadcast(namespace, "genericTeam", msgData);
    });

    // Corner - Team Data
    socket.listen(namespace, "corner", function (data) {
        var msgData = {
            "text2":data.teamData.name,
            "text1":"Corner",
            "colour1": data.teamData.colour
        };
        socket.broadcast(namespace, "genericTeam", msgData);
    });

    // Substitution - Player Data 1, Player Data 2, Team Data
    socket.listen(namespace, "substitution", function (data) {
        console.log("Substitution", data.teamData, data.on, data.off);
        var msgData = {
            "text1":data.on.name,
            "text2":data.off.name,
            "colour1": data.teamData.colour
        };
        socket.broadcast(namespace, "substitution", msgData);
    });

    // Generic LT Data - Name, Description
    socket.listen(namespace, "genericLt", function (data) {
        console.log("Generic LT", data.teamData, data.name, data.description);
        var msgData = {
            "text1":data.name,
            "text2":data.description
        };
        socket.broadcast(namespace, "generic", msgData);
    });

    // Generic LT for Players with colours
    socket.listen(namespace, "genericLt", function (data) {
        console.log("Generic LT", data.teamData, data.name, data.description);
        var msgData = {
            "text1":data.name,
            "text2":data.description,
            "colour1":data.teamData.colour
        };
        socket.broadcast(namespace, "genericTeam", msgData);
    });

    socket.listen(namespace, "showScoreLt", function () {
        console.log("Show Score");
        //Exeter &nbsp;&nbsp;1&nbs
        //&nbsp;2&nbsp;&nbsp; Bath
    });

    socket.listen(namespace, "hideScoreLt", function () {
        console.log("Hide Score");
    });

    socket.listen(namespace, "clearLt", function () {
        console.log("Clear All LTs");
        socket.broadcast(namespace, "hideLt");
    });
};
