// On Load

$('#redCard').hide();

var text1 = "";
var text2 = "";
var colour1 = "#784a5b";
var colour2 = "#784a5b";

// Caspar Functions

function setSocketAddress(address, port) {
    connect(address, port);
};


function showLt(){
    $(".lowerThird").show();
    $(".lowerThird").animo({
        animation: "fadeInUp",
        duration: 0.3
    });
    window.setTimeout(hideLt, 5000);

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
var namespace = "lowerThirds";

listenForInstruction(namespace, "ltPlay", function (data) {
    updateData(data);
    showLt();
});

listenForInstruction(namespace, "ltHide", function () {
    stop();
});


// Hide LT on start up
hideLt();
