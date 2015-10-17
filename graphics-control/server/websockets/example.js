'use strict';

module.exports = function(socket) {
    setInterval(function () {
        socket.broadcast('namespace', 'instruction', 'data');
    }, 1000);

    socket.listen(function (namespace, instruction, data) {
        console.log('namespace', 'instruction', 'data');
    });
};
