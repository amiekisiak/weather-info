const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayDate = document.querySelector("#today-date");
const forecast = document.querySelector("#forecast");
const historyList = document.querySelector("#history");

const apiKey = "171039f1e0834332f8c071e671e98eac";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

// Fetch 5-day forecast for a city
async function getForecast(city) {
  const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}`);
  const data = await response.json();
  
  // Update today date
  todayDate.innerHTML = `<p class="h5 mt-3">Today: ${formatDate(data.list[0].dt * 1000)}</p>`;
  
  // Update 5-day forecast
  forecast.innerHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    forecast.innerHTML += `
      <div class="col-md-2 mt-3">
        <div class="card text-center h-100">
          <div class="card-body">
            <p>${formatDate(data.list[i].dt * 1000)}</p>
            <p><i class="wi wi-owm-${data.list[i].weather[0].id}"></i></p>
            <p>${kelvinToCelsius(data.list[i].main.temp)}&#8451;</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
            <p>Wind: ${data.list[i].wind.speed}m/s</p>
          </div>
        </div>      </div>
        `;
      }
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
      
      return `${day} ${month} ${year}`;
    }
    
    // Submit search form
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const city = searchInput.value;
      if (city) {
        getForecast(city);
        searchInput.value = "";
      }
    });
    
    
