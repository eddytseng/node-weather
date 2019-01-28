const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const { User } = require('./user.model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'johnappleseed@apple.com',
	password: 'userOnePassword',
	tokens: [{
		access: 'auth',
		token: jwt.sign({ _id: userOneId, access: 'auth'}, 'somesecretwordforsalting').toString()
	}]
}, {
	_id: userTwoId,
	email: 'johnsmith@email.com',
	password: 'userTwoPassword'
}];

const populateUsers = (done) => {
	User
		.deleteMany({})
		.then(() => {
			var user1 = new User(users[0]).save();
			var user2 = new User(users[1]).save();

			return Promise.all([user1, user2]);
		})
		.then(() => done());
};

module.exports = {
	users,
	populateUsers
}