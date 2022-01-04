const container = document.querySelector(".container"),
inputDetails = document.querySelector(".input-details"),
inputText = inputDetails.querySelector(".input-text"),
inputField = inputDetails.querySelector("input"),
locationButton = inputDetails.querySelector("button"),
weatherDetail = container.querySelector(".weather-detail"),
weatherIcon = weatherDetail.querySelector("img");
backArrow = container.querySelector("header i");

let api;
// In order to call api upon a key is pressed on keyboard 

inputField.addEventListener("keyup", event =>{
    if(event.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
})

// To get location

locationButton.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser doesn't support geolocation api");
    }
});

// requestApi function

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e6cf1c2573b763c81cb6abacb572c232`;
    fetchData();
}


// Function onSuccess

function onSuccess(position){
    const {lat, lon} = position.coord;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e6cf1c2573b763c81cb6abacb572c232`;
    fetchData();
}

// Function onError

function onError(error){
    inputText.innerText = error.message;
    inputText.classList.add("error");
}

// The function fetchData()

function fetchData(){
    inputText.innerText = "Getting weather detail ...";
    inputText.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherInformation(result)).catch(() =>{
        inputText.innerText = "Something went wrong";
        inputText.classList.replace("pending", "error");
    });
}

// Function for the detailed weather section

function weatherInformation(info){
    if(info.cod == "404"){
        inputText.classList.replace("pending", "error");
        inputText.innerText = `${inputField.value} is not a valid city`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather;
        const {temp, feels_like, humidity} = info.main;


        if(id == 800){
            weatherIcon.src = "images/clear.svg";
        }else if(id >= 200 && id <= 232){
            weatherIcon.src = "images/stormy.svg";  
        }else if(id >= 600 && id <= 622){
            weatherIcon.src = "images/snowy.svg";
        }else if(id >= 701 && id <= 781){
            weatherIcon.src = "images/hazey.svg";
        }else if(id >= 801 && id <= 804){
            weatherIcon.src = "images/cloudy.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            weatherIcon.src = "images/rain.svg";
        }

        weatherDetail.querySelector(".temperature .value").innerText = Math.floor(temp);
        weatherDetail.querySelector(".weather").innerText = `${description}`;
        weatherDetail.querySelector(".location .span").innerText = `${city}, ${country}`;
        weatherDetail.querySelector(".temperature .value2").innerText=Maths.floor(feels_like);
        weatherDetail.querySelector(".humidity  span").innerText = `${humidity}`;
        inputText.classList.remove("pending", "error");
        inputText.innerText = " ";
        inputField.value = " ";
        container.classList.add("active");
    }
}

backArrow.addEventListener("click", ()=>{
    container.classList.remove("active");
})