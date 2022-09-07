/* let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
}; */

//current date
let currentTime = new Date();
let dateNow = document.querySelector("#current-date");
let timeNow = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
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
  "Desember",
];
let month = months[currentTime.getMonth()];
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
let date = currentTime.getDate();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
dateNow.innerHTML = `${day}, ${date} ${month}`;
timeNow.innerHTML = ` ⏰ ${hour}:${minute}`;

// C/F

/* function fTempGet(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = 72;
}
let fTempLink = document.querySelector("#fahrenheit-temperature");
fTempLink.addEventListener("click", fTempGet);

function cTempGet(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = 22;
}
let cTempLink = document.querySelector("#celsius-temperature");
cTempLink.addEventListener("click", cTempGet); */

// temperature and geoposition

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInputElement = cityInput.value.toUpperCase();

  let apiKey = "1bc31ae99edca4b6ba3766063c71acb9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputElement}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let speed = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  let currentTemperature = document.querySelector("#current-temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentSpeed = document.querySelector("#wind");
  let desiredCity = document.querySelector("#desired-city");
  let iconWeather = document.querySelector("#icon");

  currentTemperature.innerHTML = temperature;
  currentHumidity.innerHTML = humidity;
  currentSpeed.innerHTML = speed;
  currentDescription.innerHTML = `${description}`;
  desiredCity.innerHTML = cityName;
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function geoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1bc31ae99edca4b6ba3766063c71acb9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentCityButton = document.querySelector("button");
currentCityButton.addEventListener("click", getCurPosition);
