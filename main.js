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





//every 8 weather arrays is 1 day
// take the average of every 8
//mmk

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

var addFiveDayWeather = function (data) {
  
  fiveDayWeatherArray = [];
  var sum = 0;
  var average = 0;

  var getAverage = function (data) {
  for (let i = 0; i <= data.list.length; i+=5) {
    console.log(data.list[i].main.temp);
    sum += data.list[i].main.temp;
    console.log('the sum is now' + sum);
    average = (sum/8);
    console.log('the average is ' + average);
    
    };
    return average;
  };
  
  console.log(getAverage(data));
    
  // console.log(sum);
 

  var weather = {
    temp:
    
  };  


  fiveDayWeatherArray.push(weather);
  renderCurrentWeather();
  };

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