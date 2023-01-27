// Add your own API key between the ""
var APIKey = "a8dd88d399c7287d32254917cfc9e273";

var searchButton = $("#search-button");

// Here we are building the URL we need to query the database

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "&appid=" + APIKey;
// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    var celsiusTemperature = Math.floor(response.main.temp - 273.15);
  // Create CODE HERE to transfer content to HTML
  var myTempDiv = $('.temp');
  myTempDiv.text(celsiusTemperature + " degrees Celsius");
  var city = response.name;
  var humidity = response.main.humidity;
  var wind = response.wind.speed;
  $('.city').text("Weather for " + city);
  $('.humidity').text("Relative humidity: " + humidity + "%");
  $('.wind').text("Wind speed: " + wind + " m/s");
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

});