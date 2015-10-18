'use strict';

var namespace = 'clock';

var mainClockTime = 0;
var extraTimeClockTime = 0;

var extraTime = 0;

var mainClockIsTicking = false;
var extraTimeClockIsTicking = false;

module.exports = function (socket) {
    function timeString(timeInSeconds) {
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - (minutes * 60);

        seconds = seconds.toFixed(0);

        minutes = (minutes < 10 ? '0' : '') + minutes;
        seconds = (seconds < 10 ? '0' : '') + seconds;

        return minutes + ':' + seconds;
    }

    function sendDataUpdate() {
        socket.broadcast(namespace, 'newData', {
            'mainClockTime': mainClockTime,
            'extraTimeClockTime': extraTimeClockTime,
            'extraTime': extraTime,
            'mainClockIsTicking': mainClockIsTicking,
            'extraTimeClockIsTicking': extraTimeClockIsTicking
        });
        socket.broadcast(namespace, 'clockTimeString', timeString(mainClockTime));
        socket.broadcast(namespace, 'extraTimeString', timeString(extraTimeClockTime));
        socket.broadcast(namespace, 'extraTime', extraTime);
    }

    socket.listen(namespace, 'requestData', function () {
        sendDataUpdate();
    });

    setInterval(function () {
        if (extraTimeClockIsTicking) {
            extraTimeClockTime++;
        }

        if (mainClockIsTicking) {
            mainClockTime++;

            if (mainClockTime === (60 * 45) || mainClockTime === (60 * 90)) {
                mainClockIsTicking = false;

                extraTimeClockTime = 0;
                extraTimeClockIsTicking = true;
            }
        }
        sendDataUpdate();
    }, 1000);

    socket.listen(namespace, 'startClock', function () {
        mainClockIsTicking = true;

        extraTimeClockTime = 0;
        extraTime = 0;
        sendDataUpdate();
    });

    socket.listen(namespace, 'resetClock', function () {
        mainClockIsTicking = false;
        mainClockTime = 0;

        extraTimeClockTime = 0;
        extraTime = 0;
        sendDataUpdate();
    });

    socket.listen(namespace, 'stopClock', function () {
        mainClockIsTicking = false;
        extraTimeClockIsTicking = false;
        sendDataUpdate();
    });

    socket.listen(namespace, 'setClockTime', function (minutes) {
        mainClockTime = minutes * 60;
        sendDataUpdate();
    });

    socket.listen(namespace, 'addExtraTime', function (minutes) {
        extraTime = minutes;
        sendDataUpdate();
    });

    socket.listen(namespace, 'removeExtraTime', function () {
        extraTime = 0;
        extraTimeClockIsTicking = false;
        sendDataUpdate();
    });

    socket.listen(namespace, 'showClock', function () {
        socket.broadcast(namespace, 'showClock', null);
    });

    socket.listen(namespace, 'hideClock', function () {
        socket.broadcast(namespace, 'hideClock', null);
    });

};
