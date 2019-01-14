const express = require('express');
const axios = require('axios');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode';

const router = express.Router();
const getCoordinates = (address) => {
	return axios
		.get(`${GEOCODE_API}/json?address=${address}&key=${GEOCODE_API_KEY}`)
		.then(res => res.data.results[0])
		.catch(error => error);
};

router.get('/:address', async (req, res) => {
	try {
		const coordinates = await getCoordinates(req.params.address);
		res.send(coordinates);
	} catch (error) {
		console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
		res
			.status(error.response.status)
			.send({ 
				status: error.response.status,
				message: error.response.statusText
			});
	}
});

module.exports = router;