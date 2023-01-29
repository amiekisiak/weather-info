// Add your own API key between the ""


var APIKey = "a8dd88d399c7287d32254917cfc9e273";
var citiesListEl = ["London", "Paris", "New York", "Tokyo"];
var currentDay = document.querySelector("#today-date");
let now = moment();
currentDay.innerHTML = now.format("DD/MM/YYYY");
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citiesListEl + "&appid=" + APIKey;

  

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(queryURL);
  // Create CODE HERE to log the resulting object
  console.log(response);
  // Create CODE HERE to calculate the temperature (converted from Kelvin)

  $('.city').html("<h2>" + response.name + "</h2>");
  $('.weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
  $('.wind').text("Wind Speed: " + response.wind.speed + " MPH");
  $('.humidity').text("Humidity: " + response.main.humidity + "%");
  $(".temperature").text("Temperature: " + response.main.temp + " F");


});

function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < citiesListEl.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("city");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", citiesListEl[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(citiesListEl[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}





