

// The function "recordCityData" is setting the value of the localStorage item 'cityNameStore', but the input element is referred to as "inputEl" which is not defined anywhere in the code.

// The for loop in the code to append the search input from local storage to the "cities-list" is using the jQuery append method, but there is no reference to the jQuery library in the code.

// The "fetchForecast" function is being called twice in the code.

// The function "getWeather" is not being used in the code.

// To resolve these issues, you should modify the code as follows:

// Replace "inputEl.value" with "searchInput.value" in the "recordCityData" function.

// Remove the jQuery append method in the for loop. You can use JavaScript to append the search input to the "cities-list".

// Remove the second call to the "fetchForecast" function.

// Remove the "getWeather" function since it is not being used.
  // Update weather information
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const todayDate = document.querySelector("#today-date");
  const forecast = document.querySelector("#forecast");
  const historyList = document.querySelector("#history");
  
  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const apiKey = "db547e69a3ae9d52dddcf598c81e7cc7";
///////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////
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
