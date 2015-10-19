// On Load

$('#full').hide();
$('#nameOnly').hide();

var name = '';
var description = '';
var isNameOnly = false;

// Caspar Functions

function setSocketAddress(address, port) {
    connect(address, port);
};

function play() {
    if (isNameOnly) {
        $('#nameOnly').show();
        $('#nameOnly').animo({
            animation: 'bounceInLeft',
            duration: 0.3
        });
    } else {
        $('#full').show();
        $('#full').animo({
            animation: 'bounceInLeft',
            duration: 0.3
        });
    }
}

function stop() {
    if (isNameOnly) {
        $('#nameOnly').animo({
            animation: 'bounceOutLeft',
            duration: 0.3
        }, function() {
            $('#nameOnly').hide();
        });
    } else {
        $('#full').animo({
            animation: 'bounceOutLeft',
            duration: 0.3
        }, function() {
            $('#full').hide();
        });
    }
}

// Utility Functions

function updateFields() {
    $('.text.name').text(name);
    $('.text.description').text(description);
}

// Update Data

function updateData(data) {
    name = data.name;

    if (data.description) {
        description = data.description;
    } else {
        description = '';
    }

    if (description === '') {
        nameOnly = true;
    } else {
        nameOnly = false;
    }

    updateFields();
}

// WebSocket Handlers
var namespace = 'lowerThirds';

listenForInstruction(namespace, 'ltPlay', function (data) {
    updateData(data);
    play();
});

listenForInstruction(namespace, 'ltHide', function () {
    stop();
});
