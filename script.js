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
        locationTxt.innerHTML = _location;
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
        // const city = info.name;
        // const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        tempTxt.innerText = temp + "°C";
        descriptionTxt.innerText = description;
        // if(id == 800){
        //     wIcon.src = "icons/clear.svg";
        // }else if(id >= 200 && id <= 232){
        //     wIcon.src = "icons/storm.svg";  
        // }else if(id >= 600 && id <= 622){
        //     wIcon.src = "icons/snow.svg";
        // }else if(id >= 701 && id <= 781){
        //     wIcon.src = "icons/haze.svg";
        // }else if(id >= 801 && id <= 804){
        //     wIcon.src = "icons/cloud.svg";
        // }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        //     wIcon.src = "icons/rain.svg";
        // }
        
        // weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        
        // weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        // weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        // weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        // infoTxt.classList.remove("pending", "error");
        // infoTxt.innerText = "";
        // inputField.value = "";
        // wrapper.classList.add("active");
    }
}