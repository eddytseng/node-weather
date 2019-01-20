const express = require('express');

const { Todo } = require('./todo.model');

const router = express.Router();

router.post('/', (req, res) => {
	const todo = new Todo({ text: req.body.text });
	
	todo
		.save()
		.then(doc => res.send(doc))
		.catch(error => res.status(400).send(error));
});

router.get('/', (req, res) => {
	Todo
		.find()
		.then(todos => res.send({todos}))
		.catch(error => res.status(400).send(error));
});

module.exports = router;