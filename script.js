_location = "Trafford";
locationTxt = document.getElementById('location-text');
tempTxt = document.getElementById('temptxt');
descriptionTxt = document.getElementById('description-text');
timeTxt = document.getElementById('time-text');
locationTxt.innerHTML = _location;
cloudy = document.getElementById('cloudy');
humidity = document.getElementById('humidity');
wind = document.getElementById('wind');
icon = document.getElementById('icon');

requestApi(_location);

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
    console.log(api);
    fetchData();
}

function fetchData(){
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch((err) =>{
        locationTxt.innerText = "Something went wrong: " + err;
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
       alert('City not found. Please enter a valid city name!');
    }else{
        day = new Date(info.dt * 1000);
        weather = info.weather[0].main;

        locationTxt.innerHTML = info.name;
        tempTxt.innerText = Math.floor(info.main.temp) + "°C";
        descriptionTxt.innerText = weather;

        cloudy.innerText = "Cloudiness: " + info.clouds.all + "%";
        humidity.innerText = "Humidity: " + info.main.humidity + "%";
        wind.innerText = "Wind: " + info.wind.speed + "m/s";

        document.body.style.background = `url('https://source.unsplash.com/random/1920x1080/?${info.name}&${weather}') no-repeat center fixed, url(loading.gif) no-repeat center fixed`;
        document.body.style.backgroundSize = "cover";

      
        
        window.onload = () => {
              document.querySelector('.loading').style.display = "none";
              document.querySelector('.weather-app').style.display = "block";
        }
        
  

        timeTxt.innerText = day.toDateString();

        _id = info.weather[0].id;
        if(_id == 800){
            icon.src = "icons/sun.png";
        }else if(_id >= 200 && _id <= 232){
            icon.src = "icons/storm.png";  
        }else if(_id >= 600 && _id <= 622){
            icon.src = "icons/snow.png";
        }else if(_id >= 701 && _id <= 781){
            icon.src = "icons/haze.png";
        }else if(_id >= 801 && _id <= 804){
            icon.src = "icons/cloud.png";
        }else if((_id >= 500 && _id <= 531) || (_id >= 300 && _id <= 321)){
            icon.src = "icons/rain.png";
        }
     
    }
}