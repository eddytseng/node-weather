const mongoose = require('mongoose');

const User = mongoose.model('User', {
	email: {
		minLength: 7,
		required: true,
		trim: true,
		type: String
	}
});

module.exports = { User };