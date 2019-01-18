const express = require('express');
const axios = require('axios');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode';

const getCoordinates = (address) => {
	return axios
	.get(`${GEOCODE_API}/json?address=${address}&key=${GEOCODE_API_KEY}`)
	.then(res => res.data.results[0])
	.catch(error => {
		throw error;
	});
};

const router = express.Router();

router.get('/:address', async (req, res) => {
	try {
		const coordinates = await getCoordinates(req.params.address);
		console.log(JSON.stringify(coordinates, undefined, 4));
		res.send(coordinates);
	} catch (error) {
		const message = 'There was a problem getting the coordinates.';
		console.log(error);
		console.log(message);
		res.status(500).json({ message });
	}
});

module.exports = router;