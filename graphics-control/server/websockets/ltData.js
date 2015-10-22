'use strict';

var ltData = require('../data/ltPresets');
var namespace = 'ltData';

module.exports = function(socket) {
    socket.listen(namespace, 'requestData', function () {
        socket.broadcast(namespace, 'newData', ltData);
    });
};
