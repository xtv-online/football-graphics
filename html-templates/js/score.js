var timeout;

var scoreData = {
    'home': {
        'name': "",
        'shortName': "",
        'colour': "",
        'score': 0
    },
    'guest': {
        'name': "",
        'shortName': "",
        'colour': "",
        'score': 0
    }
};

function updateScore(){
    $("#homeName").text(scoreData.home.shortName);
    $("#guestName").text(scoreData.guest.shortName);
    $("#gameScore").text(scoreData.home.score + " | " + scoreData.guest.score);
    $("#homeColour").css("background-color", scoreData.home.colour);
    $("#guestColour").css("background-color", scoreData.guest.colour);
}

function showLt(){
    clearTimeout(timeout);
    $(".lowerThird").show();
    $(".lowerThird").animo({
        animation: "fadeInUp",
        duration: 0.3
    });
}

function hideLt() {
    $(".lowerThird").animo({
        animation: "fadeOutDown",
        duration: 0.5
    }, function() {
        $(".lowerThird").hide();
    });
}

function setLtData(){
    $("#text1").html(scoreData.home.name + " &nbsp;&nbsp;" + scoreData.home.score + "&nbsp;");
    $('#text2').html("&nbsp;" + scoreData.guest.score + "&nbsp;&nbsp;" + scoreData.guest.name);

    $(".ltBothTeamColour").css("border-left-color", scoreData.home.colour);
    $(".ltBothTeamColour").css("border-right-color", scoreData.guest.colour);
}

// WebSocket Handlers
var graphicsNamespace = "graphics";
var scoreNamespace = "scoreCounter";

listenForInstruction(scoreNamespace, "scoreData", function (data) {
    scoreData = data;
    updateScore();
});

listenForInstruction(graphicsNamespace, "score", function () {
    // wait for new score data to have been transmitted
    timeout = window.setTimeout(function(){
        setLtData();
        console.log("Showing new score");
        showLt();
        timeout = window.setTimeout(hideLt, 5000);
    }, 100);
});

listenForInstruction(graphicsNamespace, "scoreShow", function () {
    // wait for score data to update
    timeout = window.setTimeout(function(){
        setLtData();
        console.log("Showing new score");
        showLt();
    }, 100);
});

listenForInstruction(graphicsNamespace, "hideLt", function () {
    hideLt()
});

// Hide LT on start up
hideLt();

// Request Score Data
sendMessage(scoreNamespace, "requestData");