// Fetch weather for a city
async function getTodayWeather(city) {
    const response = await fetch(`${weatherUrl}${city}&appid=${apiKey}`);
    const data = await response.json();
  