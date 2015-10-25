var timeout;

function showDiv(identifier){
    $(identifier).show();
    $(identifier).animo({
        animation: "fadeInDown",
        duration: 0.3
    });
}

function hideDiv(identifier){
    $(identifier).animo({
        animation: "fadeOutUp",
        duration: 0.5
    }, function() {
        $(identifier).hide();
    });

}

function timeString(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds - (minutes * 60);

    seconds = seconds.toFixed(0);

    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;

    return minutes + ':' + seconds;
}

function updateMatchTime(seconds) {
    $("#matchTime").text(timeString(seconds));
}

function updateOverTime(seconds) {
    $("#overTime").text(timeString(seconds));
}

// WebSocket Handlers
var namespace = "clock";

listenForInstruction(namespace, "newData", function (data) {
    console.log("Updated clock data", data);
    updateMatchTime(data.mainClockTime);

    if (data.extraTimeClockIsTicking) {
        if (!$("#overTime").is(":visible")){
            showDiv("#overTime");
        }
        updateOverTime(data.extraTimeClockTime)
    }
    else {
        if ($("#overTime").is(":visible")){
            hideDiv("#overTime");
        }
    }

    if (data.extraTime > 0) {
        if (!$("#stoppageTime").is(":visible")){
            showDiv("#stoppageTime");
        }
        $("#stoppageTime").text(data.extraTime + "'");
    }
    else {
        if ($("#stoppageTime").is(":visible")){
            hideDiv("#stoppageTime");
        }
    }
});

listenForInstruction(namespace, "showClock", function (data) {
    showDiv("#clock");
});

listenForInstruction(namespace, "hideClock", function (data) {
    hideDiv("#clock");
});

// Request Score Data
sendMessage(namespace, "requestData");
hideDiv("#overTime");
hideDiv("#stoppageTime");