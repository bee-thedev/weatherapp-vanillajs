const container = document.querySelector(".container"),
inputDetails = document.querySelector(".input-details"),
inputText = inputDetails.querySelector(".input-text"),
inputField = inputDetails.querySelector("input"),
locationButton = inputDetails.querySelector("button"),
weatherDetail = container.querySelector(".weather-detail"),
weatherIcon = weatherDetail.querySelector("span");
backArrow = container.querySelector("header i");

let api;
// In order to call api upon a key is pressed on keyboard 

inputField.addEventListener("keyup", event =>{
    if(event.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
})

// requestApi function

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=your_api_key`;
    fetchData();
}

// To get location

locationButton.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser doesn't support geolocation api");
    }
});

// Function onSuccess

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=your_api_key`;
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
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        inputText.innerText = "Something went wrong";
        inputText.classList.replace("pending", "error");
    });
}

// Functyion for the detailed weather section

