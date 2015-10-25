'use strict';

var dataInterface = require('../data/data');
var namespace = 'scoreCounter';

var data = {
    'home': {
        'name': '',
        'shortName': '',
        'colour':'',
        'score': 0
    },
    'guest': {
        'name': '',
        'shortName': '',
        'colour':'',
        'score': 0
    }
};

module.exports = function (socket) {
    function sendDataUpdate() {
        socket.broadcast(namespace, 'scoreData', data);
    }

    dataInterface.listenForUpdates(function (newData) {
        data.home.name = newData.home.name;
        data.home.shortName = newData.home.shortName;
        data.home.colour= newData.home.colour;
        data.guest.name = newData.guest.name;
        data.guest.shortName = newData.guest.shortName;
        data.guest.colour = newData.guest.colour;
        sendDataUpdate();
    });

    socket.listen(namespace, 'requestData', function () {
        dataInterface.requestData();
    });

    socket.listen(namespace, 'incrementHome', function () {
        data.home.score++;
        sendDataUpdate();
    });

    socket.listen(namespace, 'decrementHome', function () {
        data.home.score--;
        sendDataUpdate();
    });

    socket.listen(namespace, 'incrementGuest', function () {
        data.guest.score++;
        sendDataUpdate();
    });

    socket.listen(namespace, 'decrementGuest', function () {
        data.guest.score--;
        sendDataUpdate();
    });

    socket.listen(namespace, 'resetScore', function () {
        data.home.score = 0;
        data.guest.score = 0;
        sendDataUpdate();
    });
    
};
