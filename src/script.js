let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function showTemperature(response) {
  let weather = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let displayCityName = document.querySelector("h1");
  displayCityName.innerHTML = `${cityName}`;
  let displayWeather = document.querySelector("h4");
  displayWeather.innerHTML = `${weather}°C`;
  document.querySelector("h5").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
}

function searchCity(city) {
  let apiKey = "1b5c1d1caa03aacc229826f51a319b3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  searchCity(city);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

let currentTime = new Date();
let h2 = document.querySelector("h2");
let date = currentTime.getDate();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let year = currentTime.getFullYear();
let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function searchlocation(position) {
  let apiKey = "1b5c1d1caa03aacc229826f51a319b3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchlocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Cardiff");
