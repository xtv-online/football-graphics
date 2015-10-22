'use strict';

var namespace = 'graphics';

module.exports = function (socket) {
    // Player Scores - Player Data + Team Data
    socket.listen(namespace, 'score', function (data) {
        console.log('Player Scored', data.teamData, data.playerData);
    });

    // Red Card - Player Data + Team Data
    socket.listen(namespace, 'redCard', function (data) {
        console.log('Red Card', data.teamData, data.playerData);
    });

    // Yellow Card - Player Data + Team Data
    socket.listen(namespace, 'yellowCard', function (data) {
        console.log('Yellow Card', data.teamData, data.playerData);
    });

    // Penalty - Team Data
    socket.listen(namespace, 'penalty', function (data) {
        console.log('Penalty', data.teamData);
    });

    // Corner - Team Data
    socket.listen(namespace, 'corner', function (data) {
        console.log('Corner', data.teamData);
    });

    // Substitution - Player Data 1, Player Data 2, Team Data
    socket.listen(namespace, 'substitution', function (data) {
        console.log('Substitution', data.teamData, data.on, data.off);
    });

    // Generic LT Data - Name, Description
    socket.listen(namespace, 'genericLt', function (data) {
        console.log('Generic LT', data.teamData, data.name, data.description);
    });

    socket.listen(namespace, 'showScoreLt', function () {
        console.log('Show Score');
    });

    socket.listen(namespace, 'hideScoreLt', function () {
        console.log('Hide Score');
    });

    socket.listen(namespace, 'clearLt', function () {
        console.log('Clear All LTs');
    });
};
