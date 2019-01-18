const express = require('express');
const axios = require('axios');

const FORECAST_KEY = process.env.FORECAST_KEY;
const FORECAST_API = 'https://api.darksky.net/forecast';

const getForecast = (coordinates) => {
	return axios.get(`${FORECAST_API}/${FORECAST_KEY}/${coordinates.lat},${coordinates.lng}`)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});
};

const router = express.Router();

router.get('/:lat/:lng', async (req, res) => {
	try {
		const forecast = await getForecast({ lat: req.params.lat, lng: req.params.lng });
		console.log(JSON.stringify(forecast, undefined, 4));
		res.send(forecast);
	} catch (error) {
		const message = 'There was a problem getting the forecast.';
		console.log(error);
		console.log(message);
		res.status(500).json({ message });
	}
});

module.exports = router;