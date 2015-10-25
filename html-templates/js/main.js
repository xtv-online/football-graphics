// On Load

var text1 = "";
var text2 = "";
var colour1 = "#784a5b";
var colour2 = "#784a5b";
var timeout;

function showLt(){
    clearTimeout(timeout);
    $(".lowerThird").show();
    $(".lowerThird").animo({
        animation: "fadeInUp",
        duration: 0.3
    });
    timeout = window.setTimeout(hideLt, 5000);
}

function hideLt() {
    $(".lowerThird").animo({
        animation: "fadeOutDown",
        duration: 0.5
    }, function() {
        $(".lowerThird").hide();
    });
}

// Utility Functions

function updateFields() {
    $("#text1").html(text1);
    $('#text2').html(text2);

    $(".ltOneTeamColour").css("border-right-color", colour1);

    $(".ltBothTeamColour").css("border-left-color", colour1);
    $(".ltBothTeamColour").css("border-right-color", colour2);
}

// Update Data

function updateData(data) {
    text1 = data.text1;

    if (data.text2) {
        text2 = data.text2;
    } else {
        text2 = '';
    }

    if (data.colour1) {
        colour1 = data.colour1;
    }

    if (data.colour2) {
        colour2 = data.colour2;
    }

    updateFields();
}

// WebSocket Handlers
var namespace = "graphics";

listenForInstruction(namespace, ltType, function (data) {
    updateData(data);
    showLt();
});

listenForInstruction("scoreCounter", "scoreData", function (data){
    console.log("Score Data:", data);
});


listenForInstruction(namespace, "hideLt", function () {
    hideLt();
});

// Hide LT on start up
hideLt();
