// remove key after assignment
const apiKey = 'c9e40c09a45f7eb4933e845e6cba1939';

const currentHumidity = document.querySelector('.humidity');
const searchBtn = document.querySelector('.btn');
const userInput = document.querySelector('.form-input');


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
    console.log(data);
    createCard(data.current, '#current');
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
    temp.textContent = current.temp;
    wind.textContent = current.wind_speed;
    humidity.textContent = current.humidity;
    uvIndex.textContent = current.uvi;

    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);
 
}

