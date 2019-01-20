const express = require('express');

const { User }= require('./user.model');

const router = express.Router();

router.post('/', (req, res) => {
	const user = new User({ email: req.body.email });

	user
		.save()
		.then(doc => res.send(doc))
		.catch(error => {
			res.status(400).send(error);
		});
});

module.exports = router;