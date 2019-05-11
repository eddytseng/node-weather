const Sequelize = require('sequelize');
const colors = require('colors');

const sequelize = new Sequelize('my_practice_db', 'root', 'reavera1', {
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