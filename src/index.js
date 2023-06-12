let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector("#time");

function updateDay() {
  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = days[now.getDay()];
}

function updateTime() {
  let currentTime = document.querySelector("#time");
  if (now.getHours() < 10) {
    var getHours = `0${now.getHours()}`;
  } else {
    getHours = `${now.getHours()}`;
  }
  if (now.getMinutes() < 10) {
    var getMinutes = `0${now.getMinutes()}`;
  } else {
    getMinutes = now.getMinutes();
  }
  let time = `${getHours}:${getMinutes}`;
  currentTime.innerHTML = time;
}
updateTime();
updateDay();

// Update static city

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation);

function updateCity(event) {
  let cityChange = document.querySelector("#city-name");

  let inputCity = document.querySelector("#search-bar");
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  cityChange.innerHTML = inputCity.value;
}

// Update current city based on geolocation

function searchCity(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function showTemperature(response) {
  let titleChange = document.querySelector("#tempNow");
  titleChange.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

searchCity("Warsaw");
