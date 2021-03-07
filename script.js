//VARIABLES
const mainContainer = document.querySelector('.container');
const mainTitle = document.querySelector('.main-title');
const form = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const submitBtn = document.querySelector('.submit-btn');
const imgContainer = document.querySelector('.image-container');
const weatherInfo = document.querySelector('.weather-info');
const timeOfDay = document.querySelector('.time');
const icon = document.querySelector('.icon');

//EVENT LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //get input value
    const city = searchInput.value.trim();
    form.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

icon.addEventListener('click', () => {
    icon.classList.toggle('animated');
});

//FUNCTIONS
const updateCity = async (city) => {
    const cityInfo = await getLocation(city);
    const weather = await getWeather(cityInfo.Key);
    return {
        cityInfo: cityInfo,
        weather: weather
    };
};

const updateUI = (data) => {

    weatherInfo.innerHTML = `
        <h2 class="location-text">${ data.cityInfo.EnglishName }, ${ data.cityInfo.Country.EnglishName }</h2>
        <h4 class="temperature">${ data.weather.Temperature.Metric.Value }<span>&degC</span></h4>
        <h3 class="forecast">${ data.weather.WeatherText }</h3>
    `;

    if (data.weather.IsDayTime === true) {
        mainContainer.style.backgroundImage = 'url(img/day.jpg)';
        mainContainer.style.color = '#222';
        submitBtn.style.border = '2px solid #222';
        submitBtn.style.color = '#222';
        searchInput.style.border = '2px solid #222'


    } else {
        mainContainer.style.backgroundImage = 'url(img/night.jpg)';
        mainContainer.style.color = '#f4f4f4';
        submitBtn.style.border = '2px solid #f4f4f4';
        submitBtn.style.color = '#f4f4f4';
        searchInput.style.border = '2px solid #f4f4f4'
    }

    //add animation to main container
    mainContainer.style.animation = 'moving 190s linear infinite';

    //remove hidden class
    imgContainer.classList.remove('hidden');
    weatherInfo.classList.remove('hidden');

    //add weather icons
    const iconSrc = `icons/${ data.weather.WeatherIcon }.svg`;
    icon.setAttribute('src', iconSrc);

    console.log(data);

};
