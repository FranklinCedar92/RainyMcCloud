var APIkey = '836a020d141462da8b2466b0c5126868';
var limit = 1;
var cityName = document.getElementById("searchInput").value;

var searchInput = document.querySelector('#searchInput');
var searchBtn = document.querySelector('#searchBtn');

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    cityName = searchInput.value.trim();

    document.querySelector(".place").textContent = cityName;
  
    if (cityName) {
        //console.log(cityName); //this works
        getData(cityName);
  
      // clear old content
        searchInput.value = "";
    }   else {
        alert("Please enter a city");
    }
};

var getData = function() {
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + APIkey;

    // console.log(geoApiUrl); // now this works
    fetch(geoApiUrl).
    then(function(response) {
        //console.log(response); //this works
        return response.json()
    })
    .then(function(data) {
        //console.log(data); //this works

        var lat = data[0].lat;
        var lon = data[0].lon;
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=` + lat + `&lon=` + lon + `&appid=` + APIkey;

        fetch(apiUrl).
        then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data); //this works

            //Heute
            document.getElementById("todayTemp").textContent = data.daily[0].temp.day + "F";
            document.getElementById("todayWind").textContent = data.daily[0].wind_speed + ' mph';
            document.getElementById("todayHum").textContent = data.daily[0].humidity + '%';
            document.getElementById("todayUV").textContent = data.daily[0].uvi;

            //Morgen
            document.getElementById("day1Temp").textContent = data.daily[1].temp.day + "F";
            document.getElementById("day1Wind").textContent = data.daily[1].wind_speed + ' mph';
            document.getElementById("day1Hum").textContent = data.daily[1].humidity + '%';

            //Ubermorgen
            document.getElementById("day2Temp").textContent = data.daily[2].temp.day + "F";
            document.getElementById("day2Wind").textContent = data.daily[2].wind_speed + ' mph';
            document.getElementById("day2Hum").textContent = data.daily[2].humidity + '%';

            //3ter Tag
            document.getElementById("day3Temp").textContent = data.daily[3].temp.day + "F";
            document.getElementById("day3Wind").textContent = data.daily[3].wind_speed + ' mph';
            document.getElementById("day3Hum").textContent = data.daily[3].humidity + '%';

            //4ter Tag
            document.getElementById("day4Temp").textContent = data.daily[4].temp.day + "F";
            document.getElementById("day4Wind").textContent = data.daily[4].wind_speed + ' mph';
            document.getElementById("day4Hum").textContent = data.daily[4].humidity + '%';

            //5ter Tag
            document.getElementById("day5Temp").textContent = data.daily[5].temp.day + "F";
            document.getElementById("day5Wind").textContent = data.daily[5].wind_speed + ' mph';
            document.getElementById("day5Hum").textContent = data.daily[5].humidity + '%';
            
        })
    })
};

searchBtn.addEventListener('click', formSubmitHandler);

// Adding recent searches to local storage
var idCounter = 0;
var searches = document.querySelector('#searches')

//array for holding past searches
var listings = [];

// grabs search input to create object item
var pastHandler = function(event) {
    event.preventDefault();

    if (cityName === "") {
        //console.log("empty field"); //this works
        return false;
    } else {
        var listingObj = {
            city: cityName
        };
    };    

    //console.log(listingObj); //this works
    createListingEl(listingObj);
};

// adds search to side nav
var createListingEl = function(listingObj) {
    var listItemEl = document.createElement('li');
    listItemEl.className = "col-12";
    listItemEl.setAttribute("list-id", idCounter);
  
    //console.log("list item created"); //this works
    searches.appendChild(listItemEl);
    
    var listBtnEl = document.createElement('button');
    listBtnEl.className = "btn cityBtn col-12";

    listBtnEl.textContent = listingObj.city;  
    // console.log(listBtnEl); //this works
    listItemEl.appendChild(listBtnEl);

    listingObj.id = idCounter;

    listings.push(listingObj);

    saveListing();

    // gives each listing an id
    idCounter++;
    //console.log(idCounter);// this works
};

// saves searches to local storage
var saveListing = function() {
    localStorage.setItem("listings", JSON.stringify(listings));
    // console.log("listing saved!") //this works
};

//retreives from storage
var loadListing = function() {
    var savedListings = localStorage.getItem("listings");
    
    //creates empty array if there are no saved searches
    if (!savedListings) {
        return false;
    }

    savedListings = JSON.parse(savedListings);

    for (var i = 0; i < savedListings.length; i++) {
        createListingEl(savedListings[i]);
    }
};

document.querySelector("#searchBtn").addEventListener('click', pastHandler);

loadListing();

document.querySelector(".date").textContent = "(" + moment().calendar('DD/MM/YYYY') + ")";
document.querySelector(".place").textContent = cityName; // this needs to be taken from the API?
document.getElementById('day1Date').textContent = moment().add(1,'d').calendar('MM/DD/YYYY');
document.getElementById('day2Date').textContent = moment().add(2,'d').calendar('MM/DD/YYYY');
document.getElementById('day3Date').textContent = moment().add(3,'d').calendar('MM/DD/YYYY');
document.getElementById('day4Date').textContent = moment().add(4,'d').calendar('MM/DD/YYYY');
document.getElementById('day5Date').textContent = moment().add(5,'d').calendar('MM/DD/YYYY');

var pastBtnHandler = function() {

}


/*
if (data.daily[0].uvi < 2) {
    document.getElementById("todayUV").classList("col-1 favorable");
    } else if (data.daily[0].uvi > 2 && data.daily[0].uvi < 4) {
        document.getElementById("todayUV").classList("col-1 moderate");
    } else {
        document.getElementById("todayUV").classList("col-1 severe");
    }
}
*/