// remove key after assignment
const apiKey = 'c9e40c09a45f7eb4933e845e6cba1939';

//global variable to grab elements in order to append
const searchBtn = document.querySelector('.btn');
const userInput = document.querySelector('.form-input');

// geo location api to convert longitude and latitude to city name and call other functions
var geoCodeApi = function(event) {
    //prevents page reload on form submission
    event.preventDefault();
    //fetches api
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userInput.value + '&limit=1&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
        //calls other functions
        oneCallApi(data);
        fiveDayForecast(data);
        saveCity(userInput.value);
        displayHistory();
    })
}

//cick button to search
searchBtn.addEventListener('click', geoCodeApi);

//one call api for longtitude and latitude
var oneCallApi = function(data) {
    var cityObj = data[0]
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
    .then(response => response.json()) 
    .then(data => {
    //function to create card for current weather
    createCard(data.current, '#current');
})

}

// function to create current weather card
var createCard = function(current, elementId) {
    //create each element for the card
    var cityName = document.createElement('h1');
    var icon = document.createElement('img');
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    var uvIndex = document.createElement('span');

    // use luxon to update date
    const currentDate = luxon.DateTime.local().toFormat('MM/dd/yyyy');
    icon.src = 'http://openweathermap.org/img/wn/' + current.weather[0].icon + '@2x.png';
    

    //add textcontent to each element
    cityName.textContent = userInput.value + ' (' + currentDate + ')';
    
    temp.textContent = 'Temp:' + current.temp;
    wind.textContent = 'Wind: ' + current.wind_speed;
    humidity.textContent = 'Humidity: ' + current.humidity;
    uvIndex.textContent = 'UV Index: ' + current.uvi;

    //append to the created weather container id current
    const weatherContainer = document.querySelector(elementId);
    // double append city name and icon
    weatherContainer.appendChild(cityName).appendChild(icon);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);
 
    //change uv background color depending on uv index
    if (current.uvi < 3) {
        uvIndex.setAttribute('style', 'color: white; background-color: green;',);
    } else if (current.uvi < 6) {
        uvIndex.setAttribute('style', 'color: white; background-color: yellow;');
    } else if (current.uvi < 8) {
        uvIndex.setAttribute('style', 'color: white; background-color: orange;');
    } else if (current.uvi < 11) {
        uvIndex.setAttribute('style', 'color: white; background-color: red;');
    } else {
        uvIndex.setAttribute('style', 'color: white; background-color: purple;');
    };

    //when searching for a city, it will replace the current city
    weatherContainer.textContent = '';
    weatherContainer.appendChild(cityName).appendChild(icon);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);
};

//five day forecast, fetch onecall api
var fiveDayForecast = function(data) {
    const cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
    .then(reponse => reponse.json())
    .then(data => {
        fiveDayElement(data.daily, '#five-day');
    })
}

//five day element which limits the daily index to 5
var fiveDayElement = function(daily, elementId) {
    const fiveDay = document.querySelector(elementId);

    //static header
    const header = document.createElement('h1');
    header.setAttribute('style', 'padding: 10px;');
    header.textContent = 'Five Day Forecast';
    fiveDay.appendChild(header);

    // only append five day forecast as onecall has many more in object array
    const index = daily.length - 3;

    for (let i = 0; i < index; i++) {
        const date = document.createElement('h2');
        const icon = document.createElement('img');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humidity = document.createElement('p');

        //use luxon to show the next five day forecast
        const dateDay = luxon.DateTime.local().plus({
          days: i + 1
        }).toFormat('MM/dd/yyyy');

        //each icon for the five day forecast
        icon.src = 'http://openweathermap.org/img/wn/' + daily[i].weather[0].icon + '@2x.png';

        //cycle through object to get specific data
        date.textContent = dateDay
        temp.textContent = 'Temp: ' + daily[i].temp.day;
        wind.textContent = 'Wind: ' + daily[i].wind_speed;
        humidity.textContent = 'Humidity: ' + daily[i].humidity;
        
        //append to five-day id container
        fiveDay.appendChild(date).appendChild(icon);
        fiveDay.appendChild(temp);
        fiveDay.appendChild(wind);
        fiveDay.appendChild(humidity);
    }

    //replaces the first searched five-day forecast with the new five-day when searching for a new city
    fiveDay.textContent = '';
    fiveDay.appendChild(header);
    for (let i = 0; i < index; i++) {
        const date = document.createElement('h2');
        const icon = document.createElement('img');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humidity = document.createElement('p');

        //use luxon to show the next five day forecast
        const dateDay = luxon.DateTime.local().plus({
          days: i + 1
        }).toFormat('MM/dd/yyyy');

        //each icon for the five day forecast
        icon.src = 'http://openweathermap.org/img/wn/' + daily[i].weather[0].icon + '@2x.png';

        //cycle through object to get specific data
        date.textContent = dateDay
        temp.textContent = 'Temp: ' + daily[i].temp.day;
        wind.textContent = 'Wind: ' + daily[i].wind_speed;
        humidity.textContent = 'Humidity: ' + daily[i].humidity;
        
        //append to five-day id container
        fiveDay.appendChild(date).appendChild(icon);
        fiveDay.appendChild(temp);
        fiveDay.appendChild(wind);
        fiveDay.appendChild(humidity);
}
};

const history = {
    cities: []
}

var saveCity = function(city) {
   history.cities.push(city);
   localStorage.setItem('history', JSON.stringify(history));
}

var displayHistory = function() {
    const historyList= document.querySelector('#history');
    historyList.textContent = '';
    for (let i =0; i < history.cities.length; i++) {
        const city= history.cities[i];
        const historyBtn = document.createElement('button');

        historyBtn.textContent = city;
        historyList.appendChild(historyBtn);
    }
}