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