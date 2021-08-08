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

var fiveDayWeather = [
  {
    mainWeather: null,
    day: null,
    temp: null,
    icon: null
  },

  {
    mainWeather: null,
    day: null,
    temp: null,
    icon: null
  },

  {
    mainWeather: null,
    day: null,
    temp: null,
    icon: null
  },

  {
    mainWeather: null,
    day: null,
    temp: null,
    icon: null
  },

  {
    mainWeather: null,
    day: null,
    temp: null,
    icon: null
  },



];

// make addFiveDayWeahter into an object with methods?
var addFiveDayWeather = {

  day1Average: function(data) {
    var day1Sum = 0;
    var day1Average = 0;
      for (let i = 0; i <= 7; i++) {
      day1Sum = data.list[i].main.temp + day1Sum;
      };
    day1Average = Math.floor(kelvinToF(day1Sum / 8));
    fiveDayWeather[0].temp = (day1Average);
  },

  day2Average: function(data) {
    var day2Sum = 0;
    var day2Average = 0;
    for (let i = 8; i <= 15; i++) {
      day2Sum = data.list[i].main.temp + day2Sum;
      };
    day2Average = Math.floor(kelvinToF(day2Sum / 8));
    fiveDayWeather[1].temp = (day2Average);
  },

  day3Average: function(data) {
    var day3Sum = 0;
    var day3Average = 0;
    for (let i = 16; i <= 23; i++) {
      day3Sum = data.list[i].main.temp + day3Sum;
    };
  day3Average = Math.floor(kelvinToF(day3Sum / 8));
    fiveDayWeather[2].temp = (day3Average);
  },

  day4Average: function(data) {
    var day4Sum = 0;
    day4Average = 0;
    for (let i = 24; i <= 31; i++) {
      day4Sum = data.list[i].main.temp + day4Sum;
    };
    day4Average = Math.floor(kelvinToF(day4Sum / 8));
    fiveDayWeather[3].temp = (day4Average);
  },

  day5Average: function(data) {
    var day5Sum = 0;
    var day5Average = 0;
    for (let i = 32; i <= 39; i++) {
      day5Sum = data.list[i].main.temp + day5Sum;
    };
    day5Average = Math.floor(kelvinToF(day5Sum / 8));
    fiveDayWeather[4].temp = (day5Average);
    console.log(fiveDayWeather);
  },
  
  renderFiveDayWeather: renderFiveDayWeather(),

};


// i am not going to really care too much how you do this. 
// whether you go every 8 and grab the average or go to 8 and grab the last 8

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

  var renderFiveDayWeather = function() {
    $('.five-day-forecast').empty();
  
    for (let i = 0; i < fiveDayWeather.length; i++) {
      const fiveDayWeatherObj = fiveDayWeather[i];
  
      var source = $('#current-weather-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(fiveDayWeatherObj);
    };
  };
  
  renderFiveDayWeather();

  var fetchFiveDay = function (query) {
    $.ajax({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=5e5a03c24f89b112d6b16ccfccf14576",
      dataType: "json",
      success: function (data) {
        
        addFiveDayWeather.day1Average(data);
        addFiveDayWeather.day2Average(data);
        addFiveDayWeather.day3Average(data);
        addFiveDayWeather.day4Average(data);
        addFiveDayWeather.day5Average(data);
        addFiveDayWeather.renderFiveDayWeather();
        

        
        // $loadingSpinner.css("display", "none");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        debugger;
        console.log(textStatus);
      }
    });
  };

 