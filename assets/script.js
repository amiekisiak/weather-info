const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayDate = document.querySelector("#today-date");
const forecast = document.querySelector("#forecast");
const historyList = document.querySelector("#history");




const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";


// Create a click event listener for each city in the history list
historyList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const city = event.target.textContent;
    getWeatherData(city);
  }
});



searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = searchInput.value;
  const today = new Date();

  

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
 
  <div class="card-weather text-black col mx-1">
  
  <div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      <p class="card-text">${description}</p>
      <p class="card-text">Temperature: ${temperature} &#8451;</p>
      <p class="card-text">Humidity: ${humidity}%</p>
      <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
    </div>
  </div>
  </div>
`;

 //display 5-day weather forecast header     
var header = document.createElement("div");
header.classList.add("h2");
header.innerHTML = "5-day Forecast";
document.createElement("div");
    
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
        const icon = data.list[i].weather[0].icon;
        const temperature = kelvinToCelsius(data.list[i].main.temp);
        const humidity = data.list[i].main.humidity;
        const windSpeed = data.list[i].wind.speed;
        forecastData += `
            <div class="col-md-2 m-2">
          <div class="card text-black mb-2">
         <div class="card-header">${date.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric" })}</div>
                  <div class="card-body">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
                    <p class="card-text">${description}</p>
                    <p class="card-text">Temperature: ${temperature} &#8451;</p>
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

