var apiKey = "836a020d141462da8b2466b0c5126868";

var getData = function() {
    console.log('hi');
    fetch(`https://api.openweathermap.org/data/2.5/onecall`).
    then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        })
    })
};

getData();


// ?lat={lat}&lon={lon}&exclude={part}&appid={API key}