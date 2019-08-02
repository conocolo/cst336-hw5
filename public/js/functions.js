$("#stateCode").on("search", function() {
    var stateCode = $(this).val();

    if (validateInput(stateCode)) {
        getEvents(stateCode);
    }
});

function validateInput(stateCode) {
    var isValid = true;
    var regex = /^[A-Za-z]+$/;

    if ((!stateCode.match(regex)) || (stateCode.length != 2)) {
        isValid = false;
    }
    return isValid;
}

function getEvents(stateCode) {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=vBBsJiQNePgXAVSYbtLMnGBHProH8T1G&stateCode="+stateCode,
        async: true,
        dataType: "json",
        success: function(json) {
            console.log(json);
        }//success
    });//ajax
}//function