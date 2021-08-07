// api key: 5e5a03c24f89b112d6b16ccfccf14576
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=41b972937f256a72881f193699a320a4

// 5 day forecast
// api.openweathermap.org/data/2.5/forecast?q=Denver&appid=41b972937f256a72881f193699a320a4


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
  fetchFiveDay(search);
  
  // console.log(search);

  // $loadingSpinner.css("display", "block");

});

var addWeather = function (data) {
  
  currentWeatherArray = [];
  
  

  var weather = {
    name: data.name || null,
    currentTemp: Math.floor(kelvinToF(data.main.temp)) + '°' || null,
    main: data.weather[0].main || null,
    icon: 'http://openweathermap.org/img/wn/' + data.weather[0].icon +'@2x.png'|| null
  };  
  currentWeatherArray.push(weather);

    // currentWeatherArray.push(weather);
    renderCurrentWeather();
    
  };

  

  
var renderCurrentWeather = function() {
  $('.current-forecast').empty();

  for (let i = 0; i < currentWeatherArray.length; i++) {
    const weather = currentWeatherArray[i];

    var source = $('#current-weather-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(weather);
   

    $('.current-forecast').append(newHTML);
  }
};

renderCurrentWeather();


function kelvinToF (number) {
  return (number - 273.15) * 9/5 + 32;
};

var fiveDayWeatherArray = [];

var renderFiveDayWeather = function() {
  $('.five-day-forecast').empty();

  for (let i = 0; i < fiveDayWeatherArray.length; i++) {
    const fiveDayWeather = fiveDayWeatherArray[i];

    var source = $('#current-weather-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(fiveDayWeather);
  };
};

fiveDayWeatherArray = [];
  

  
  // for (let i = 0; i <= data.list.length; i+=5) {
  //   console.log(data.list[i].main.temp);
  //   sum += data.list[i].main.temp;
    

  // every 8 items is 1 day
  // so take every 8 items, take the average, use the kelvinToF founc, and push it into fiveDayWeather[0].temp
  // take the 8th item, and grab the main temp, and the icon

  
  // object -> array of objects
  // final product: overall weather of the day, weather temp of the day, icon, and day of the week
  // objects w/in an object? or array of objects.
  
  // var fiveDayWeather = [
  //   {
  //     overallWeather: main weather of the day
  //     day: take the Date, and convert it to the day it is
  //     temp: number using kelvinToF function
  //     icon: icon url

  //   },
  // ]

  // day 1 = fiveDayWeather[0].overallWeather


  var fetchFiveDay = function (query) {
    $.ajax({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=5e5a03c24f89b112d6b16ccfccf14576",
      dataType: "json",
      success: function (data) {
        
        addFiveDayWeather(data);
        
        // $loadingSpinner.css("display", "none");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        debugger;
        console.log(textStatus);
      }
    });
  };