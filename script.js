_location = "Kathmandu";
locationTxt = document.getElementById('location-text');
tempTxt = document.getElementById('temptxt');
descriptionTxt = document.getElementById('description-text');
locationTxt.innerHTML = _location;

function searchClick() {
    var _location = document.getElementById("search").value;
    if (_location == "") {
        alert("Please enter a location");
    } else {
        requestApi(_location);
        document.body.style.background = "url('https://source.unsplash.com/featured?"+_location+"') no-repeat center fixed";
        document.body.style.backgroundSize = "cover";
    }
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cdffaa4cc6491debc7c970bbae3e8d3d`;
    console.log(api);
    fetchData();
}

function fetchData(){
    document.getElementById('location-text').innerText = "Getting weather details...";
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        locationTxt.innerText = "Something went wrong";
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        locationTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        locationTxt.innerHTML = city;
        tempTxt.innerText = Math.floor(temp) + "°C";
        descriptionTxt.innerText = description;
        // if(id == 800){
        //     icon.src = "icons/clear.svg";
        // }else if(id >= 200 && id <= 232){
        //     icon.src = "icons/storm.svg";  
        // }else if(id >= 600 && id <= 622){
        //     icon.src = "icons/snow.svg";
        // }else if(id >= 701 && id <= 781){
        //     icon.src = "icons/haze.svg";
        // }else if(id >= 801 && id <= 804){
        //     icon.src = "icons/cloud.svg";
        // }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        //     icon.src = "icons/rain.svg";
        // }
    }
}