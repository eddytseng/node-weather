const express = require('express');
const _ = require('lodash');

const { User } = require('./user.model');

const router = express.Router();

router.post('/', (req, res) => {
	const user = new User(_.pick(req.body, ['email', 'password']));

	user
		.save()
		.then(user => res.send(user))
		.catch((error) => {
			res.sendStatus(400);
		});
});

module.exports = router;