// remove key after assignment
const apiKey = 'c9e40c09a45f7eb4933e845e6cba1939';

const searchBtn = document.querySelector('.btn');
const userInput = document.querySelector('.form-input');




var geoCodeApi = function(event) {
    event.preventDefault();
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userInput.value + '&limit=1&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
        oneCallApi(data);
        fiveDayForecast(data);
    })
}

searchBtn.addEventListener('click', geoCodeApi);

var oneCallApi = function(data) {
    var cityObj = data[0]
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
    .then(response => response.json()) 
    .then(data => {
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

//five day forecast
var fiveDayForecast = function(data) {
    const cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
    .then(reponse => reponse.json())
    .then(data => {
        fiveDayElement(data.daily, '#five-day');
        console.log(data.daily);
    })
}

//five day element which limits the daily index to 5
var fiveDayElement = function(daily, elementId) {
    const fiveDay = document.querySelector(elementId);
    const index = daily.length - 3;
    for (let i = 0; i < index; i++) {
        const date = document.createElement('h2');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humidity = document.createElement('p');

        date.textContent = daily[i].dt;
        temp.textContent = 'Temp: ' + daily[i].temp.day;
        wind.textContent = 'Wind: ' + daily[i].wind_speed;
        humidity.textContent = 'Humidity: ' + daily[i].humidity;

        fiveDay.appendChild(date);
        fiveDay.appendChild(temp);
        fiveDay.appendChild(wind);
        fiveDay.appendChild(humidity);
    }
}

// fiveDayForecast = function(data) {
//     const cityObj = data[0];
//     fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
//     .then(response => response.json())
//     .then(data => {
//         fiveDayElement(data.daily, '#five-day');
//     })
// }
// //display fiveDayForecast
// var fiveDayElement = function(list, elementId) {
//     const fiveDay = document.querySelector(elementId);
//     for (let i = 0; i < list.length; i++) {
//         const date = document.createElement('h2');
//         const temp = document.createElement('p');
//         const wind = document.createElement('p');
//         const humidity = document.createElement('p');

//         date.textContent = 'Date: ' + list[i].dt_txt;
//         temp.textContent = 'Temp: ' + list[i].main.temp;
//         wind.textContent = 'Wind: ' + list[i].wind.speed;
//         humidity.textContent = 'Humidity: ' + list[i].main.humidity;

//         fiveDay.appendChild(date);
//         fiveDay.appendChild(temp);
//         fiveDay.appendChild(wind);
//         fiveDay.appendChild(humidity);
//     }
// }