//Initializing the default location
_location = "Trafford";


// Storing the document objects in a variable for easy access
locationTxt = document.getElementById('location-text');
locationTxt.innerHTML = _location;

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

requestApi(_location);
getQuote();

function getQuote(){
    fetch("https://type.fit/api/quotes")
  .then(res => res.json())
  .then((data) => {
    random = Math.floor(Math.random() * (data.length + 1));
    quote.innerHTML = data[random].text + "<br><br>&mdash;" + data[random].author;
  });
}


search.addEventListener("keyup", handleEnter);
function handleEnter(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      searchClick();
    }
  }
  

function searchClick() {
    var _location = document.getElementById("search").value;
    if (_location == "") {
        alert("Please enter a location");
    } else {
        requestApi(_location);
    }
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cdffaa4cc6491debc7c970bbae3e8d3d`;
    fetchData();
}

function fetchData(){
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch((err) =>{
       alert("Something went wrong: " + err);
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
       alert('City not found. Please enter a valid city name!');
    }else{

        date = new Date(info.dt * 1000);
        weather = info.weather[0].main;

        locationTxt.innerText = info.name;
        tempTxt.innerText = Math.round(info.main.temp) + "°C";
        descriptionTxt.innerText = weather;
        cloudy.innerText = "Cloudiness: " + info.clouds.all + "%";
        humidity.innerText = "Humidity: " + info.main.humidity + "%";
        pressure.innerText = "Pressure: " + info.main.pressure + " hPa";
        wind.innerText = "Wind: " + info.wind.speed + "m/s with Direction: " + info.wind.deg + "°";
        timeTxt.innerText = date.toDateString();

        document.body.style.background = `url('https://source.unsplash.com/random/1920x1080/?${info.name}&${weather}') no-repeat center fixed, url(loading-bg.gif) no-repeat center fixed`;
        document.body.style.backgroundSize = "40% 100% 40%";


        window.onload = () => {
              document.querySelector('.loading').style.display = "none";
              document.querySelector('.weather-app').style.display = "block";
        }
        

        // Custom icons according to the weather
        _id = info.weather[0].id;
        if(_id == 800){
            icon.src = "icons/sun.gif";
        }else if(_id >= 200 && _id <= 232){
            icon.src = "icons/storm.gif";  
        }else if(_id >= 600 && _id <= 622){
            icon.src = "icons/snow.gif";
        }else if(_id >= 701 && _id <= 781){
            icon.src = "icons/haze.gif";
        }else if(_id >= 801 && _id <= 804){
            icon.src = "icons/cloud.gif";
        }else if((_id >= 500 && _id <= 531) || (_id >= 300 && _id <= 321)){
            icon.src = "icons/rain.gif";
        }

    }
}