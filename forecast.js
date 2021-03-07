const apiKey = 'b1uGYLDiXVRt0MVz0kMHMboGByxbGlbk';

//GET WEATHER
const getWeather = async (cityKey) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

    const query = `${ cityKey }?apikey=${ apiKey }`;

    const response = await fetch(base + query);

    const data = await response.json();

    return data[0];

};

//GET LOCATION
const getLocation = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${ apiKey }&q=${ city }`;

    const response = await fetch(base + query);

    const data = await response.json();

    return data[0];

}

