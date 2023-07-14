var apiKey = 'dd7208055c3d1ba3783b44cb5a0318fc'

var currentCity = document.getElementById('currentcity');
var searchInput = document.getElementById('cityname')
var icon = document.getElementById('icon');
var temperature = document.getElementById('current-temp');
var humidityId = document.getElementById('current-humidity');
var wind = document.getElementById('current-wind');
var futureForecast = document.getElementById('forecast-display');
var currentDayForecast =  document.getElementById('currentDay');

var fiveDayForecast = document.getElementById('fiveday-forecast')
var cityHistory = document.querySelector('ul');
var searchButton = document.getElementById('search-button');
var clearButton = document.getElementById('clearBtn');
var recentSearches = [];
console.log('---')


function formSubmitHandler(event){
  event.preventDefault();

  var search = searchInput.value.trim();
  cityApi(search)

}
searchButton.addEventListener('click', formSubmitHandler);

function historyData(){
 
  for (var  i = 0; i < recentSearches.length; i++) {
    var savedSearches = document.createElement('li');
    savedSearches.dataset.city = recentSearches[i].city;
    savedSearches.textContent = recentSearches[i].city;
    cityHistory.append(savedSearches);
  }
  
}

function clearAll() {
  var userInput = document.getElementById("cityname")
  fiveDayForecast.innerHTML = '';

    if (userInput.type == "text") {
      userInput.value = "";
    }
};

clearButton.addEventListener('click', clearAll);

function saveHistory(){

}

function cityApi(city) {
  var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
      
    })
    .then(function (data) {
      console.log(data)
      var lat = data[0].lat;
      console.log(lat)
      var lon = data[0].lon;
      console.log(lon)
      weatherApi(lat,lon);
    });
}


function weatherApi(lat,lon) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
      
    })
    .then(function (data) {
      console.log(data);
      
      var city = data.name;
      console.log(city)
      var temp = "Temp:" + data.main.temp;
      console.log(temp)
      var humidity = "Humidity:" + data.main.humidity;
      console.log(humidity);
      var windSpeed = "Wind:" + data.wind.speed;
      console.log(windSpeed);
      currentCity.textContent = city;
      temperature.textContent = temp;
      humidityId.textContent = humidity;
      wind.textContent = windSpeed;
    });
  
 var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

 fetch(forecastUrl)
    .then(function (response) {
      return response.json();
      
    })
    .then(function (data) {

      console.log(data);
      for (i = 4; i <= 40; i += 8) {
      var date = data.list[i].dt_txt;
      
      console.log(date)
      
      var forecastTemperature = "temp:" + data.list[i].main.temp + "F";
      

      console.log(forecastTemperature)

      var forecastHumidity = "Humidity:" + data.list[i].main.humidity;
      
      console.log(forecastHumidity)

      var forecastWindSpeed = "Wind-Speed:" + data.list[i].wind.speed;
      
      console.log(forecastWindSpeed)

      var futureForecasts = [date, forecastTemperature, forecastHumidity, forecastWindSpeed];
      console.log(futureForecasts)
      var cards = document.createElement('div')
      cards.textContent = futureForecasts;
      fiveDayForecast.append(cards);

      }
      
      
    });
}
//local storage that saves search creating search history
