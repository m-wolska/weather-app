// Declare some resuable objects
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
let defaultCity = "Warsaw";
// Update time and date to the most current one.
// Return hours and minutes with 0 if the time is under 10.
function updateTimeAndDate() {
  let now = new Date();
  document.querySelector("#day").innerHTML = days[now.getDay()];
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
  document.querySelector("#time").innerHTML = `${getHours}:${getMinutes}`;
}
// Immediately update time and date.
updateTimeAndDate();

// Update the city based on the search bar input and update the temperature for this city accordingly
// using API call.
function updateCity(event) {
  let inputCity = document.querySelector("#search-bar");
  let newCity = inputCity.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  document.querySelector("#city-name").innerHTML = newCity;
}

// Update current city based on geolocation
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
// Generate geolocation call to browser to extract positon data.
function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
// Extract lat and longtitude values to use it for the API call to get temperature values for given position.
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}
// Function to be used in combination with Weather API response.
// Update relevant weather metrics based on the trigger.
function showTemperature(response) {
  document.querySelector("#tempNow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
// Add EventListeners to the buttons to trigerr action on click.
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation);
searchCity(defaultCity);
