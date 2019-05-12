const Sequelize = require('sequelize');
const colors = require('colors');

const DB_NAME = process.env.DB_NAME; 
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: 'localhost',
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to the database has been established successfully.'.green);
	})
	.catch((err) => {
		console.log('Unable to connect to the database: '.red, err.red);
	});

const Dog = sequelize.define('Dog', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	breed: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	age: {
		type: Sequelize.INTEGER,
		allowNull: false,
	}
});

Dog
	.sync({ force: true })
	.then(() => {
		return Dog.create({
			name: 'Matt Damon',
			breed: 'Labrador Retriever',
			age: 9
		});
	})
	.then(() => {
		Dog.create({ 
			name: 'Roo',
			breed: 'Great Dane',
			age: 5
		})
		.then((dog) => {
			console.log(`${dog.name} was created successfully.`.cyan);
		})
		.catch((err) => {
			console.log('There was a problem creating the dog.'.red, err);
		});

		Dog.create({ 
			name: 'Maui',
			breed: 'Beagle',
			age: 12
		})
		.then((dog) => {
			console.log(`${dog.name} was created successfully.`.cyan);
		})
		.catch((err) => {
			console.log('There was a problem creating the dog.'.red, err);
		});
	})