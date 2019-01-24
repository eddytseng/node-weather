const express = require('express');
const { ObjectID } = require('mongodb');

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

router.get('/:id', (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.sendStatus(404);
	}

	Todo
		.findById(id)
		.then((todo) => {
			if (todo) {
				res.send({todo});
			} else {
				res.sendStatus(404);
			}
		})
		.catch(error => res.sendStatus(400));
});

module.exports = router;