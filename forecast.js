const axios = require('axios');

const DARK_SKY_API_KEY = '650138a13d0fa7d54389269a0b3ab545';
const FORECAST_API = 'https://api.darksky.net/forecast';

const getForecast = (coordinates) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${FORECAST_API}/${DARK_SKY_API_KEY}/${coordinates.lat},${coordinates.lng}`)
			.then(res => resolve(res.data))
			.catch(error => reject(error));
	});
};

module.exports = {
	get: getForecast
};