const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayDate = document.querySelector("#today-date");
const forecast = document.querySelector("#forecast");
const historyList = document.querySelector("#history");

const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "db547e69a3ae9d52dddcf598c81e7cc7";

// Sets the input value in localStorage
function recordCityData() {
  localStorage.setItem('cityNameStore', inputEl.value);
}
// Append the search input from localStorage to the cities list
for (var i = 0; i < localStorage.length; i++) {
  $(".cities-list").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}
// Current Day Forecast function
$.ajax ({
  url: weatherUrl,
  method: "GET"
})
  .then(function(response) {

      // Add weather info to page
      $('.city').html("<h2>" + response.name + "</h2>");
      $('.weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
      $('.wind').text("Wind Speed: " + response.wind.speed + " MPH");
      $('.humidity').text("Humidity: " + response.main.humidity + "%");
      $(".temperature").text("Temperature: " + response.main.temp + " F");
    })

// Fetch weather for a city
async function fetchWeather(city) {
  const response = await fetch(`${weatherUrl}${city}&appid=${apiKey}`);
  const data = await response.json();

  // Update today date
  todayDate.innerHTML = `<p class="h5 mt-3">Today: ${formatDate(data.dt * 1000)}</p>`;
// Update weather information
forecast.innerHTML = "";
forecast.innerHTML += `
  <div class="col-md-12 mt-3">
    <div class="card text-center h-100">
      <div class="card-body">
        <p><i class="wi wi-owm-${data.weather[0].id}"></i></p>
        <p>${kelvinToCelsius(data.main.temp)}&#8451;</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed}m/s</p>
      </div>
      </div>
      </div>
    `;
    
    // Fetch weather forecast for the next 5 days
    fetchForecast(city);
  }


  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = searchInput.value;
    fetchWeather(city);
    recordCityData();
  });
  
  
  // Fetch weather forecast for the next 5 days
  async function fetchForecast(city) {
    const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}`);
    const data = await response.json();
  
    // Filter forecast for every 3 hours
    const forecastData = data.list.filter(item => {
      return item.dt_txt.includes("15:00:00");
    });
  
    // Display the forecast for next 5 days
    forecast.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      forecast.innerHTML += `
        <div class="col-md-2 mt-3">
          <div class="card text-center h-100">
            <div class="card-body">
              <p>${formatDate(forecastData[i].dt * 1000)}</p>
              <p><i class="wi wi-owm-${forecastData[i].weather[0].id}"></i></p>
              <p>${kelvinToCelsius(forecastData[i].main.temp)}&#8451;</p>
              <p>Humidity: ${forecastData[i].main.humidity}%</p>
            </div>
            </div>
          </div>
        `;
      }
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = searchInput.value;
        fetchForecast(city);
        recordCityData();
      });
      
    
    // Fetch weather for a city
    async function getWeather(city) {
      const response = await fetch(`${weatherUrl}${city}&appid=${apiKey}`);
      const data = await response.json();
    
      // Update today date
      todayDate.innerHTML = `<p class="h5 mt-3">Today: ${formatDate(data.dt * 1000)}</p>`;

  // Update weather information
  getWeather(city);
}
// Convert Kelvin to Celsius
function kelvinToCelsius(temp) {
  return Math.round(temp - 273.15);
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
