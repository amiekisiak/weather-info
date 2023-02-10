
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const todayDate = document.querySelector("#today-date");
  const forecast = document.querySelector("#forecast");
  const historyList = document.querySelector("#history");
  
  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const city = searchInput.value;
  const weatherApiUrl = `${weatherUrl}${city}&appid=${apiKey}`;

  fetch(weatherApiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const today = new Date();
      todayDate.textContent = today.toLocaleDateString();

      const currentWeather = data.weather[0].main;
      const temperature = data.main.temp;
      forecast.textContent = `Weather: ${currentWeather} | Temperature: ${temperature}°C`;
    })
    .catch(function(error) {
      console.error("Error:", error);
      forecast.textContent = "Could not get weather information";
    });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = searchInput.value;
  const today = new Date();
  todayDate.textContent = `${today.toLocaleDateString()}`;

  fetch(`${weatherUrl}${city}&appid=${apiKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const cityName = data.name;
      const country = data.sys.country;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temperature = data.main.temp;

      todayDate.textContent = `${cityName}, ${country} - ${today.toLocaleDateString()}`;
      forecast.innerHTML = `
        <div class="card-body">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
          <p class="card-text">${description}</p>
          <p class="card-text">Temperature: ${temperature} &#8451;</p>
        </div>
      `;

      fetch(`${apiUrl}q=${city}&appid=${apiKey}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let forecastData = "";
          for (let i = 0; i < 5; i++) {
            const date = new Date(data.list[i].dt * 1000);
            const description = data.list[i].weather[0].description;
            const icon = data.list[i].weather[0].icon;
            const temperature = data.list[i].main.temp;

            forecastData += `
              <div class="col-md-2">
                <div class="card text-white bg-primary mb-3">
                  <div class="card-header">${date.toLocaleDateString()}</div>
                  <div class="card-body">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
                    <p class="card-text">${description}</p>
                    <p class="card-text">Temperature: ${temperature} &#8451;</p>
                  </div>
                </div>
              </div>
            `;
          }
          forecast.innerHTML += `<div class="row">${forecastData}</div>`;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

// Convert Kelvin to Celsius
function kelvinToCelsius(temp) {
  var celsius = temp - 273.15;
  return Math.round(celsius);
}

var temperature = kelvinToCelsius(281.55);
console.log("Temperature: " + temperature + "°C");
