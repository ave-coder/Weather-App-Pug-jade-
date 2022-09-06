const API = 'http://api.weatherstack.com/current?access_key=235d2dae47facbc224089ef754baefb6';
const render = document.getElementById("root");
const textInput = document.getElementById('text-input');
const formSubmit = document.getElementById('form');

// store - СОЗДАЕМ ОБЪЕКТ В КОТОРОМ БУДУТ НАХОДИТЬСЯ ДАННЫЕ ПО УМОЛЧАНИЮ 

let store = {
    city: 'Samara',
    feelslike: 0,
    cloudcover: 0,
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    observationTime: "00:00 AM",
    visibility: 0,
    localtime: "2022-09-06 11:18",
}

// fetchData - СОЗДАЕМ ФУНКЦИЮ, КОТОРАЯ ПОЛУЧАЕТ ДАННЫЕ И ПАРСИТ JSON

const fetchData = async () => {
    const response = await fetch(`${API}&query=${store.city}`)
    const data = await response.json();

    console.log(data);

    const { current: { feelslike, cloudcover, temperature, observation_time: observationTime, wind_speed: windSpeed, humidity, visibility, is_day: isDay },
        location: { localtime } } = data;

    store = {
        ...store,
        feelslike,
        cloudcover,
        temperature,
        observationTime,
        windSpeed,
        humidity,
        visibility,
        isDay,
        localtime,
    }

    renderComponent();
}

// component - СОЗДАЕМ КОМПОНЕНТ, КОТОРЫЙ БУДЕТ ВОЗВРАЩАТЬ РАЗМЕТКУ

const component = () => {
    const { city, feelslike, cloudcover, temperature, observationTime, windSpeed, humidity, visibility, isDay, localtime } = store;
    const chooseTheme = isDay === "yes" ? "isday" : ""; // меняем фон в зависимости от условия 

    return `<div class="container ${chooseTheme}">
                <div class="weather-side">
                <div class="weather-gradient"></div>
                <div class="date-container">
                    <h2 class="date-dayname">${city}</h2><span class="date-day">${observationTime}</span><span class="location">${localtime}</span>
                </div>
                <div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
                    <h1 class="weather-temp">${temperature}°C</h1>
                    <h3 class="weather-desc">Sunny</h3>
                </div>
                </div>
                <div class="info-side">
                <div class="today-info-container">
                    <div class="today-info">
                    <div class="precipitation"> <span class="title">ВИДИМОСТЬ</span><span class="value">${visibility}%</span>
                        <div class="clear"></div>
                    </div>
                    <div class="humidity"> <span class="title">ВЛАЖНОСТЬ</span><span class="value">${humidity} %</span>
                        <div class="clear"></div>
                    </div>
                    <div class="wind"> <span class="title">ВЕТЕР</span><span class="value">${windSpeed} km/h</span>
                        <div class="clear"></div>
                    </div>
                    </div>
                </div>
                <div class="week-container">
                    <ul class="week-list">
                    <li class="active"><i class="day-icon" data-feather="sun"></i><span class="day-name">Tue</span><span class="day-temp">29°C</span></li>
                    <li><i class="day-icon" data-feather="cloud"></i><span class="day-name">Wed</span><span class="day-temp">21°C</span></li>
                    <li><i class="day-icon" data-feather="cloud-snow"></i><span class="day-name">Thu</span><span class="day-temp">08°C</span></li>
                    <li><i class="day-icon" data-feather="cloud-rain"></i><span class="day-name">Fry</span><span class="day-temp">19°C</span></li>
                    <div class="clear"></div>
                    </ul>
                </div>
                <div class="location-container">
                    <button class="location-button"> <i></i><span>Выбрать город</span></button>
                </div>
                </div>
  </div>`
}

// searchCity - ФУНКЦИЯ, КОТОРАЯ СКРЫВАЕТ ИЛИ ОТОБРАЖАЕТ БЛОК

const searchCity = () => {
    const popup = document.getElementById('popup');

    popup.classList.toggle("visibility");
}

// renderComponent - ФУНКЦИЯ, КОТОРАЯ ДОБАВЛЯЕТ КОНТЕНТ НА СТРАНИЦУ И ОТСЛЕЖИВАЕТ СОБЫТИЯ

const renderComponent = () => {
    render.innerHTML = component();

    const city = document.querySelector('.location-button');
    city.addEventListener("click", searchCity);
};

// inputValue - ФУНКЦИЯ, КОТОРАЯ ОТСЛЕЖИВАЕТ ЗНАЧЕНИЕ VALUE 

const inputValue = (e) => {
    store = {
        ...store,
        city: e.target.value,
    };
};

// inputSubmit - ФУНКЦИЯ, КОТОРАЯ ОБНОВЛЯЕТ ГОРОД И ДАННЫЕ 

const inputSubmit = (e) => {
    e.preventDefault();

    fetchData();
    searchCity(); // закрываем popup
};

// СЛУШАЕМ СОБЫТИЯ

formSubmit.addEventListener('submit', inputSubmit);
textInput.addEventListener('input', inputValue);

fetchData();