require('dotenv').config();
require('./config/config');

// // Library imports
const express = require('express');
const bodyParser = require('body-parser');

// Why do we need to require this here?
// The server will not connect to the database without it
// But it is never called.
const mongoose = require('./db/mongoose');

// // Local imports
const forecast = require('./forecast');
const geocode = require('./geocode');
const todo = require('./todo');
const user = require('./user');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/forecast', forecast);
app.use('/geocode', geocode);
app.use('/todos', todo);
app.use('/users', user);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;