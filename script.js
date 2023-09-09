const apiKey = '9c09a4004ff25f0df6b34dff82007ab2';
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const weatherIconElement = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
let isCelsius = true;

function setBackgroundImage(url) {
    document.body.style.backgroundImage = `url('${url}')`;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;

    if (city) {
        fetchWeather(city);
    }
});
fetch(`https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                
                showError('City not found. Please try again.');
            } else {
               
                showWeather(data);
            }
        })
        .catch(error => {
            showError('An error occurred while fetching data. Please try again.');
        });


function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                
                showError('City not found. Please try again.');
            } else {
               
                showWeather(data);
            }
        })
        .catch(error => {
            showError('An error occurred while fetching data. Please try again.');
        });
}

function showWeather(data) {
    temp_=data.main.temp;
    const location = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const weatherCondition = data.weather[0].main.toLowerCase();
    const backgroundUrl = `images/${weatherCondition}.jpg`; 

    
    const img = new Image();
    img.src = backgroundUrl;
    img.onload = function () {
        setBackgroundImage(backgroundUrl);
    };

    document.body.className = weatherCondition;

    locationElement.textContent = location;
    temperatureElement.textContent = temperature+ ' °C';
    weatherDescriptionElement.textContent = weatherDescription;
    weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}


function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    const temperature = parseFloat(temp_);

    if (isCelsius) {
        temperatureElement.textContent = temperature.toFixed(1) + ' °C';
    } else {
        const temperatureFahrenheit = (temperature * 9) / 5 + 32;
        temperatureElement.textContent = temperatureFahrenheit.toFixed(1) + ' °F';
    }
}

const toggleUnitButton = document.getElementById('toggleUnitButton');
toggleUnitButton.addEventListener('click', toggleTemperatureUnit);
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}