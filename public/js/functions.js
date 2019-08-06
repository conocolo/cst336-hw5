// Search function
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
            $("#events").html("");
            var events = json._embedded.events;
            for (let i = 0; i < events.length; i++) {
                $("#events").append("<h5>"+events[i].name+"</h5>");
                $("#events").append("<h7>"+events[i]._embedded.venues[0].name + " - " +events[i]._embedded.venues[0].city.name + "</h7><br>");
                $("#events").append("<h7>"+events[i].dates.start.localDate+" @ "+events[i].dates.start.localTime + "</h7><br>");
                $("#events").append("<a href='"+events[i].url + "'>Ticketmaster Link </a><br>");
                $("#events").append("<img id='"+events[i].id+"' src='"+ events[i].images[2].url + "' width=200 height=200>")
                $("#events").append("<img class='favoriteIcon' src='img/fav_off.png'></img>");
                $("#events").append("<hr>");
            }
            
        }//success
    });//ajax
}//function

// Favorites function
$("#events").on("click", function(e) {
    var className = $(e.target).prop('class');
    if (className == 'favoriteIcon') {
        //alert("Hi I'm working!");
        var tmId = $(e.target).prev().attr("id");
        var imageURL = $(e.target).prev().attr("src");
        var eventLink = $(e.target).prev().prev().prev().attr("href");
        var eventDate = $(e.target).prev().prev().prev().prev().prev().text();
        var eventName = $(e.target).prev().prev().prev().prev().prev().prev().prev().prev().text();

        if ($(e.target).attr("src") == "img/fav_off.png") {
            $(e.target).attr("src", "img/fav_on.png");
            updateFavorite("add", tmId, imageURL, eventName, eventLink, eventDate); //insert a new record
        } else {
            $(e.target).attr("src", "img/fav_off.png");
            updateFavorite("del", tmId); //delete record from db
        }
    }
});

// Database updater
function updateFavorite(action, tmId, imageURL, eventName, eventLink, eventDate) {
    $.ajax({
        method: "get",
        url:    "/api/updateFavorites",
        data:   { tmId: tmId,
                  imageURL: imageURL,
                  eventName: eventName,
                  eventLink: eventLink,
                  eventDate: eventDate,
                  action: action
                }

    });
}