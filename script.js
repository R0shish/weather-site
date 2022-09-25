//Initializing the default location
query = "trafford,gb";


// Storing the document objects in a variable for easy access
locationTxt = document.getElementById('location-text');
locationTxt.innerHTML = query;

search = document.getElementById("search"),
    tempTxt = document.getElementById('temptxt');
descriptionTxt = document.getElementById('description-text');
timeTxt = document.getElementById('time-text');
cloudy = document.getElementById('cloudy');
humidity = document.getElementById('humidity');
pressure = document.getElementById('pressure');
wind = document.getElementById('wind');
icon = document.getElementById('icon');
quote = document.getElementById('quote');
last_updated = document.getElementById('last-updated');

if (localStorage.when != null
    && parseInt(localStorage.when) + 300000 > Date.now()) {
    let freshness = Math.round(((Date.now() - localStorage.when) / 1000) / 60) + " minute(s)";
    console.log(`Data from local storage updated ${freshness} ago`);
    locationTxt.innerText = localStorage.city + ", " + localStorage.country;
    tempTxt.innerText = localStorage.temp + "°C";
    descriptionTxt.innerText = localStorage.description;
    timeTxt.innerText = localStorage.time;
    cloudy.innerText = "Cloudiness: " + localStorage.cloudiness + "%";
    humidity.innerText = "Humidity: " + localStorage.humidity + "%";
    pressure.innerText = "Pressure: " + localStorage.pressure + " hPa";
    wind.innerText = "Wind: " + localStorage.wind + "m/s with Direction: " + localStorage.wind_direction + "°";
    if (!navigator.onLine){
        document.body.style.background = `url('background.jpg') no-repeat center fixed`;
    } else{
        document.body.style.background = `url('https://source.unsplash.com/random/1920x1080/?${localStorage.city}&${localStorage.temp}') no-repeat center fixed, url(loading-bg.gif) no-repeat center fixed`;
    }
    document.body.style.backgroundSize = "40% 100% 40%";

    last_updated.innerHTML = "Last Updated: " + freshness;

    getQuote();

    setTimeout(() => {
        document.querySelector('.loading').style.display = "none";
        document.querySelector('.weather-app').style.display = "block";
    }, 2000);

    _id = localStorage.id;
    if (_id == 800) {
        icon.src = "icons/sun.gif";
    } else if (_id >= 200 && _id <= 232) {
        icon.src = "icons/storm.gif";
    } else if (_id >= 600 && _id <= 622) {
        icon.src = "icons/snow.gif";
    } else if (_id >= 701 && _id <= 781) {
        icon.src = "icons/haze.gif";
    } else if (_id >= 801 && _id <= 804) {
        icon.src = "icons/cloud.gif";
    } else if ((_id >= 500 && _id <= 531) || (_id >= 300 && _id <= 321)) {
        icon.src = "icons/rain.gif";
    }

} else {
    requestApi(query);
}


getQuote();

function getQuote() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then((data) => {
            localStorage.quote = data.content
            localStorage.author = data.author
            quote.innerHTML = data.content + "<br><br>&mdash;" + data.author;
        }).catch((e) => {
            console.log(e);
            quote.innerHTML = localStorage.quote + "<br><br>&mdash;" + localStorage.author;
        });
}


search.addEventListener("keyup", handleEnter);
function handleEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchClick();
    }
}


function searchClick() {
    var query = document.getElementById("search").value.replace(/ +/g, '');
    if (query == "") {
        alert("Please enter a location");
    } else {
        requestApi(query);
    }
}

function requestApi(query) {
    api = `http://localhost/index.php?query=${query}`;
    fetchData();
}

function fetchData() {
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch((err) => {
        if (err.toString().includes("TypeError: Failed to fetch")) {
            alert("Error 500 - Internal Server Error");
        } else if (!navigator.onLine){
            alert("Error - Please check your internet connection!");
        }
        else if (err.toString().includes("Unexpected non-whitespace character after JSON at position 4")){
            alert("Error 404 - City Not Found");
        }
          else{
            alert("An unknown error occured. Please contact me at Roshish152002@gmail.com");
        }
    });
}

function weatherDetails(info) {


    date = new Date(info.dt * 1000);
    weather = info.weather_main;
    temperature = Math.round(info.weather_temp)

    locationTxt.innerText = info.city + ", " + info.country;
    tempTxt.innerText = temperature + "°C";
    descriptionTxt.innerText = weather;
    cloudy.innerText = "Cloudiness: " + info.cloudiness + "%";
    humidity.innerText = "Humidity: " + info.humidity + "%";
    pressure.innerText = "Pressure: " + info.pressure + " hPa";
    wind.innerText = "Wind: " + info.weather_wind + "m/s with Direction: " + info.weather_wind_direction + "°";
    last_updated.innerText = "Last Updated: " + info.weather_time.toLocaleString().slice(11, -3);
    timeTxt.innerText = date.toDateString();
    if (!navigator.onLine){
        document.body.style.background = `url('background.jpg') no-repeat center fixed`;
    } else{
        document.body.style.background = `url('https://source.unsplash.com/random/1920x1080/?${localStorage.city}&${localStorage.temp}') no-repeat center fixed, url(loading-bg.gif) no-repeat center fixed`;
    }
    document.body.style.backgroundSize = "40% 100% 40%";

    localStorage.temp = temperature;
    localStorage.description = weather;
    localStorage.cloudiness = info.cloudiness;
    localStorage.humidity = info.humidity;
    localStorage.pressure = info.pressure;
    localStorage.wind = info.weather_wind;
    localStorage.wind_direction = info.weather_wind_direction;
    localStorage.time = date.toDateString();
    localStorage.city = info.city;
    localStorage.country = info.country;
    localStorage.when = Date.now();
    localStorage.id = info.weather_id;


    setTimeout(() => {
        document.querySelector('.loading').style.display = "none";
        document.querySelector('.weather-app').style.display = "block";
    }, 2000);

    // Custom icons according to the weather
    _id = info.weather_id;
    if (_id == 800) {
        icon.src = "icons/sun.gif";
    } else if (_id >= 200 && _id <= 232) {
        icon.src = "icons/storm.gif";
    } else if (_id >= 600 && _id <= 622) {
        icon.src = "icons/snow.gif";
    } else if (_id >= 701 && _id <= 781) {
        icon.src = "icons/haze.gif";
    } else if (_id >= 801 && _id <= 804) {
        icon.src = "icons/cloud.gif";
    } else if ((_id >= 500 && _id <= 531) || (_id >= 300 && _id <= 321)) {
        icon.src = "icons/rain.gif";
    }
}