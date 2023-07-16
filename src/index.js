function formatTimeAndDate(timeStamp) {
  // Declare some reusable objects
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let fullDate = new Date(timeStamp * 1000);
  let month = months[fullDate.getMonth()];
  let day = formatTime(fullDate.getDate());
  let dayOfTheWeek = days[fullDate.getDay()];
  // Hours part from the timestamp
  let hourNow = formatTime(fullDate.getHours());
  // Minutes part from the timestamp
  let minutesNow = formatTime(fullDate.getMinutes());
  // update the day and time on the page
  document.querySelector("#day").innerHTML = `${dayOfTheWeek} ${day} ${month}`;
  document.querySelector("#time").innerHTML = `${hourNow}:${minutesNow}`;
}

function formatTime(unit) {
  if (unit < 10) {
    return `0${unit}`;
  }
  return unit;
}

function getDayShort(timeStamp) {
  let fullDate = new Date(timeStamp * 1000);
  let day = formatTime(fullDate.getDate());
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfTheWeek = days[fullDate.getDay()];
  return dayOfTheWeek;
}
// Add EventListeners to the buttons to trigger action on click.
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("search-bar");
  search(cityInputElement.value);
}

// Update the city based on the search bar input and update the temperature for this city accordingly
// using API call.
function updateCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-bar");
  searchCity(inputCity.value);
}

// Update current city based on geolocation
function searchCity(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
// Get latitude and longitude to then show forecast

function getForecast(coordinates) {
  console.log(coordinates);
  let longitude = coordinates.lon;
  let latitute = coordinates.lat;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitute}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getIcons);
}

// Get icons for forecast

function getIcons(response) {
  let forecastStart = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (day, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2 mx-auto">
            <img class="fc-icon"
              src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"
              alt=""
            />
            <div class="weather-details">
              <span class="fc-day">${getDayShort(day.dt)}</span>
              <p>
              <span class="fc-max-temp">${Math.round(day.temp.max)}°C</span>
              <span class="fc-min-temp">${Math.round(day.temp.min)}°C</span> 
              </p>
          </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastStart.innerHTML = forecastHTML;
}

// Function to be used in combination with Weather API response.
// Update relevant weather metrics based on the trigger.
function showTemperature(response) {
  getForecast(response.data.coord);
  mainCelsiusTemp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let humidityValue = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let description = response.data.weather[0].description;
  let firstLetter = description.charAt(0).toUpperCase() + description.slice(1);
  let weatherIcon = document.querySelector("#weather-icon");

  document.querySelector("#tempNow").innerHTML = mainCelsiusTemp;
  document.querySelector("#city-name").innerHTML = cityName;
  document.querySelector("#humidity").innerHTML = humidityValue;
  document.querySelector("#wind").innerHTML = windSpeed;
  document.querySelector("#description").innerHTML = firstLetter;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  formatTimeAndDate(response.data.dt);
}

// Generate geolocation call to browser to extract positon data.
function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
// Extract lat and longtitude values to use it for the API call to get temperature values for given position.
function getPosition(position) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("search-bar");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("London");
