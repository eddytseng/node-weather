const bcrypt = require('bcryptjs');
const express = require('express');
const _ = require('lodash');

const { User } = require('./user.model');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);
	const user = new User(body);

	user
		.save()
		.then(() => user.generateAuthToken())
		.then(token => res.header('x-auth', token).send(user))
		.catch((error) => {
			res.sendStatus(400);
		});
});

router.post('/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);

	User
		.findByCredentials(body.email, body.password)
		.then((user) => {
			return user.generateAuthToken().then((token) => {
				res.header('x-auth', token).send(user);
			});
		})
		.catch((error) => {
			res.sendStatus(400);
		});
});

router.get('/me', authenticate, (req, res) => {
	res.send(req.user);
});

module.exports = router;