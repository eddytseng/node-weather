const { ObjectID } = require('mongodb');

const { Todo } = require('./todo.model');

const todos = [
	{ 
		_id: new ObjectID(),
		text: 'First test todo'
	},
	{
		_id: new ObjectID(),
		text: 'Second test todo'
	}
];

const populateTodos = (done) => {
	Todo
		.deleteMany({})
		.then(() => Todo.insertMany(todos))
		.then(() => {
			done();
		});
}

module.exports = {
	todos,
	populateTodos
}