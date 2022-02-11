var APIkey = '836a020d141462da8b2466b0c5126868';
var limit = 1;
var cityName = document.getElementById("searchInput").value;
//var cityName = "Dallas";
var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + APIkey;

var searchInput = document.querySelector('#searchInput');
var searchBtn = document.querySelector('#searchBtn');

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var cityName = searchInput.value.trim();
  
    if (cityName) {
        getData(cityName);
  
      // clear old content
        searchInput.value = "";
    }   else {
        alert("Please enter a city");
    }
};

var getData = function() {
    console.log('I am working');
    fetch(geoApiUrl).
    then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);

        var lat = data[0].lat;
        var lon = data[0].lon;
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=` + lat + `&lon=` + lon + `&appid=` + APIkey;

        fetch(apiUrl).
        then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
        })
    })
};

searchBtn.addEventListener('click', formSubmitHandler);

getData();


// city_name, current.temp, current.humidity, current.wind_speed, hourly.uvi

var idCounter = 0;
var searches = document.querySelector('#searches')

//array for holding past searches
var listings = [];

// grabs search input to create object item
var pastHandler = function(event) {
    event.preventDefault();
    
    //var searchInput = cityName;

    //console.log(searchInput)

    if (cityName === "") {
        console.log("empty field");
        return false;
    } else {
        var listingObj = {
            city: cityName
        };
    };    

    console.log(listingObj);
    createListingEl(listingObj);
    // all of this works
};

// adds search to side nav
var createListingEl = function(listingObj) {
    var listItemEl = document.createElement('li');
    listItemEl.className = "col-12";
    listItemEl.setAttribute("list-id", idCounter);
  
    console.log("list item created"); //this works
    searches.appendChild(listItemEl);
    
    var listBtnEl = document.createElement('button');
    listBtnEl.className = "btn cityBtn col-12";

    listBtnEl.textContent = listingObj.city;  
    console.log(listBtnEl); //this works
    listItemEl.appendChild(listBtnEl);

    listingObj.id = idCounter;

    listings.push(listingObj);

    saveListing();

    // gives each listing an id
    idCounter++;
};

// saves searches to local storage
var saveListing = function() {
    localStorage.setItem("listings", JSON.stringify(listings));
    console.log("listing saved!")
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