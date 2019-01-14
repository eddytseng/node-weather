const axios = require('axios');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode';

const getCoordinates = (address) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${GEOCODE_API}/json?address=${address}&key=${GEOCODE_API_KEY}`)
			.then(res => resolve(res.data.results[0]))
			.catch(error => reject(error.response.data));
	});
};

module.exports = {
	getCoordinates
};