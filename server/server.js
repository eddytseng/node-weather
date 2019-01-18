require('dotenv').config();

const express = require('express');
const forecast = require('./forecast');
const geocode = require('./geocode');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/forecast', forecast);
app.use('/geocode', geocode);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports.app = app;

console.log('Type "./mongod --dbpath ~/mongo-data" in the terminal to start the database.');
console.log('Type "./mongo" in another terminal to start the database server we just started.');