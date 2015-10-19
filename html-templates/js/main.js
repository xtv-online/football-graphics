// On Load

$('#redCard').hide();

var name = '';
var description = '';

// Caspar Functions

function setSocketAddress(address, port) {
    connect(address, port);
};


function showLt(){
    $('#redCard').show();
    $('#redCard').animo({
        animation: 'fadeInUp',
        duration: 0.3
    });
    window.setTimeout(hideLt, 5000);
}

function hideLt() {
    $('#redCard').animo({
        animation: 'fadeOutDown',
        duration: 0.5
    }, function() {
        $('#redCard').hide();
    });
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
    showLt();
});

listenForInstruction(namespace, 'ltHide', function () {
    stop();
});
