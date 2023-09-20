const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayDate = document.querySelector("#today-date");
const forecast = document.querySelector("#forecast");
const historyList = document.querySelector("#history");
const apiKey = "db547e69a3ae9d52dddcf598c81e7cc7";


const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";




let searchHistory = [];

// Check if there is any stored data in the local storage
if (localStorage.getItem("searchHistory")) {
  // If there is, retrieve the data and update the `searchHistory` array
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  // Render the buttons for the stored cities
  searchHistory.forEach((city) => {
    const cityButton = document.createElement("button");
    cityButton.classList.add("city-button", "btn", "btn-light");
    cityButton.innerText = city;
    cityButton.addEventListener("click", (event) => {
      searchInput.value = city;
      searchForm.dispatchEvent(new Event("submit"));
    });
    historyList.appendChild(cityButton);
  });
}

// Create a clear button
const clearButton = document.createElement("button");
clearButton.classList.add("clear-button", "btn", "btn-danger");
clearButton.innerText = "Clear";
clearButton.addEventListener("click", (event) => {
  searchHistory = [];
  localStorage.removeItem("searchHistory");
  historyList.innerHTML = "";
});
historyList.appendChild(clearButton);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = searchInput.value;

  // Add the city to the `searchHistory` array and store it in the local storage
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    // Create a button for the city
    const cityButton = document.createElement("button");
    cityButton.classList.add("city-button", "btn", "btn-light");
    cityButton.innerText = city;
    cityButton.addEventListener("click", (event) => {
      searchInput.value = city;
      searchForm.dispatchEvent(new Event("submit"));
    });
    historyList.appendChild(cityButton);
  }

  const today = new Date();


  //get current weather for the city of choice
  fetch(`${weatherUrl}${city}&appid=${apiKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      const cityName = data.name;
      const country = data.sys.country;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temperature = kelvinToCelsius(data.main.temp);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      forecast.innerHTML = `
        
        
       <div class="weather-col-md-4">
       <div class="card text-black mb-2">
       <div class="card-header">
       <h5>${cityName}, ${country} - ${today.toLocaleDateString("en-GB")}</h5></div>
       <div class="card-weather col">
       <div>
      <img src="https://openweathermap.org/img/wn/10d@2x.png"alt="weather icon" alt="weather icon">
      <p class="card-text">${description}</p>
      <p class="card-text">Temp: ${temperature} &#8451;</p>
      <p class="card-text">Humidity: ${humidity}%</p>
      <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
    </div>
  </div>
  </div>
  </div>
 
`;

      //get forecast for the next 5 days
      fetch(`${apiUrl}q=${city}&appid=${apiKey}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let forecastData = "";
          let currentDate = new Date();


          for (let i = 2; i < 7; i++) {
            currentDate.setDate(currentDate.getDate() + 1);
            const date = currentDate;
            const description = data.list[i].weather[0].description;

            const temperature = kelvinToCelsius(data.list[i].main.temp);
            const humidity = data.list[i].main.humidity;
            const windSpeed = data.list[i].wind.speed;

            forecastData += `
            
        <div class="col-md-2 m-2">
        <div class="card mb-2">
         <div class="card-header">${date.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric" })}</div>
                  <div class="card-body">
                    <img src="https://openweathermap.org/img/wn/10d@2x.png"alt="weather icon" alt="weather icon">
                    <p class="card-text">${description}</p>
                    <p class="card-text">Temp: ${temperature} &#8451;</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                    <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
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