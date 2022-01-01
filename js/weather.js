const container = document.querySelector(".container"),
inputDetails = document.querySelector(".input-details"),
inputText = inputDetails.querySelector(".input-text"),
inputField = inputDetails.querySelector("input"),
locationButton = inputDetails.querySelector("button"),
weatherDetail = container.querySelector(".weather-detail"),
weatherIcon = weatherDetail.querySelector("span");
backArrow = container.querySelector("header i");

let api;