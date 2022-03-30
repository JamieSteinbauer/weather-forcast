// remove key after assignment
const apiKey = 'c9e40c09a45f7eb4933e845e6cba1939';

const currentHumidity = document.querySelector('.humidity');
const searchBtn = document.querySelector('.btn');
const userInput = document.querySelector('.form-input');
const fiveDayEl = document.querySelector('#five-day');


var geoCodeApi = function(event) {
    event.preventDefault();
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userInput.value + '&limit=1&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
        oneCallApi(data);
    })
}

searchBtn.addEventListener('click', geoCodeApi);

var oneCallApi = function(data) {
    var cityObj = data[0]
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
    .then(response => response.json()) 
    .then(data => {
    createCard(data.current, '#current');
    // fiveDay(data.daily, );
})

}

// change current to something more generic
var createCard = function(current, elementId) {
    var cityName = document.createElement('h1');
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    var uvIndex = document.createElement('p');

    cityName.textContent = userInput.value;
    temp.textContent = 'Temp:' + current.temp;
    wind.textContent = 'Wind: ' + current.wind_speed;
    humidity.textContent = 'Humidity: ' + current.humidity;
    uvIndex.textContent = 'UV Index: ' + current.uvi;

    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);
 
}

var fiveDay = function() {
    var dailyTemp = document.createElement('p');
    var dailyWind = document.createElement('p');
    var dailyHumidity = document.createElement('p');

    dailyTemp.textContent = daily.temp;
    dailyWind.textContent = daily.wind_speed;
    dailyHumidity.textContent = daily.humidity;

    
}


