const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayDate = document.querySelector("#today-date");
const forecast = document.querySelector("#forecast");
const historyList = document.querySelector("#history");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#weather-icon");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

const apiKey = "de28c647c4a3000a78a941c3c1b97985";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Event listener for search button
searchForm.addEventListener("submit", event => {
  event.preventDefault();
 
  const cityName = searchInput.value;
  if (cityName === "") {
    return;
  }
  fetch(`${API_URL}${cityName}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const weather = data.weather[0];
    const main = data.main;
    const windData = data.wind;
    // Update today's date
    todayDate.textContent = new Date().toDateString();
  
    // Update city name
    city.textContent = data.name;
  
    // Update temperature
    temperature.textContent = `Temperature: ${kelvinToCelsius(main.temp)}°C`;
  
    // Update weather icon
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${
      weather.icon
    }@2x.png" />`;
  
    // Update humidity
    humidity.textContent = `Humidity: ${main.humidity}%`;
    // Update wind
    wind.textContent = `Wind: ${windData.speed}m/s`;
  });
});

// Convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
fetch(`${API_URL}${cityName}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // your code here
  })
  .catch(error => console.error(error));










///////////////////////////////////////////////////////////////////////////////////////////

