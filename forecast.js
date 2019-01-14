const axios = require('axios');

const FORECAST_KEY = process.env.FORECAST_KEY;
const FORECAST_API = 'https://api.darksky.net/forecast';

const getForecast = (coordinates) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${FORECAST_API}/${FORECAST_KEY}/${coordinates.lat},${coordinates.lng}`)
			.then(res => resolve(res.data))
			.catch(error => reject(error));
	});
};

module.exports = {
	get: getForecast
};