// api key: 5e5a03c24f89b112d6b16ccfccf14576
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=41b972937f256a72881f193699a320a4


var currentWeatherArray = [];

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=5e5a03c24f89b112d6b16ccfccf14576",
    dataType: "json",
    success: function (data) {
      addWeather(data);
      
      // $loadingSpinner.css("display", "none");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      debugger;
      console.log(textStatus);
    }
  });
};

$('.search').on('click', function () {
  var search = $('#search-query').val();
  
  fetch(search);
  
  console.log(search);

  // $loadingSpinner.css("display", "block");

});

var addWeather = function (data) {
  currentWeatherArray = [];
  
  for (var i = 0; i < data.length; i++) {
    var weather = {
      name: data[i].name || null,
      currentTemp: kelvinToF(data[i].main.temp) || null,
      main: data[i].weather.main || null
    };
    debugger;

    console.log(data[i].weather.main);
    currentWeatherArray.push(weather);
  };

  renderCurrentWeather();
};



var renderCurrentWeather = function() {
  $('.current-forecast').empty();

  for (let i = 0; i < currentWeatherArray.length; i++) {
    const weather = currentWeatherArray[i];

    var source = $('#current-weather-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(currentWeatherArray[i]);
   

    $('.current-forecast').append(newHTML);
  }
};

renderCurrentWeather();

function kelvinToF (number) {
  return (number - 273.15) * 9/5 + 32;
};





renderCurrentWeather();


