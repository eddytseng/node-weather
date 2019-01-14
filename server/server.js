require('dotenv').config();

const express = require('express');
const forecast = require('./forecast');
const geocode = require('./geocode');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/forecast', forecast);
app.use('/geocode', geocode);

app.get('/', (req, res) => {
	res.send({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});