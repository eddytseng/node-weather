const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
	email: {
		minLength: 7,
		required: true,
		trim: true,
		type: String,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: `{VALUE} is not a valid email`
		}
	},
	password: {
		minLength: 6,
		required: true,
		type: String
	},
	tokens: [{
		access: {
			required: true,
			type: String
		},
		token: {
			required: true,
			type: String
		},
	}],
});

module.exports = { User };