const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const forecast = require('./forecast.js');
const geocode = require('./geocode.js');
const notes = require('./notes.js');

const argv = yargs
	.command(
		'forecast',
		'Prints out the forecast', {
			latitude: {
				describe: 'The North/South geographic coordinates',
				demand: false,
				alias: 'lat'
			},
			longitude: {
				describe: 'The East/West geographic coordinates',
				demand: false,
				alias: 'lng'
			},
			address: {
				describe: 'Address string',
				demand: false,
				alias: 'a'
			}
		}
	)
	.command(
		'geocode',
		'Returns an array of geographic coordinates', {
			address: {
				describe: 'Address string',
				demand: true,
				alias: 'a'
			}
		}
	)
	.help()
	.argv;

const command = argv._[0];

async function getForecast(address) {
	const geocodeObject = await geocode.getCoordinates(address);
	forecast
		.get({ lat: geocodeObject.geometry.location.lat, lng: geocodeObject.geometry.location.lng })
		.then(res => console.log(`${res.currently.temperature}°F`))
		.catch(error => console.log(error));
}

switch (command) {
	case 'geocode':
		geocode
			.getCoordinates(argv.address)
			.then(response => {
				console.log(JSON.stringify(response, undefined, 2));
				console.log(response.formatted_address);
				console.log(response.geometry.location.lat, response.geometry.location.lng);
			})
			.catch(error => console.log(error.error_message));
		break;
	case 'forecast':
		getForecast(argv.address);
		break;
	case 'add':
		notes.addNote(argv.title, argv.body);
		break;
	case 'list':
		console.log(notes.getAll());
		break;
	case 'read':
		var note = notes.getNote(argv.title);

		if (note) {
			console.log('Note:', note);
		} else {
			console.log('Note not found');
		}
		break;
	case 'remove':
		notes.removeNote(argv.title);
		break;
	default:
		break;
}