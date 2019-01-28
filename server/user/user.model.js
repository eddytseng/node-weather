const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const UserSchema = mongoose.Schema({
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

// Overwrite the default mongoose.model method toJSON so it only return the _id and email
UserSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// Create a new method that returns a promise that saves the token 
UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const access = 'auth';
	const token = jwt.sign({
		_id: user._id.toHexString(),
		access: access
	}, 'somesecretwordforsalting').toString();

	// user.tokens.push({ access, token }) does not work in some versions of mongoose
	// below is a workaround for most versions
	// user.tokens = user.tokens.concat([{ access, token }]);

	user.tokens.push({ access, token });

	return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
	const User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'somesecretwordforsalting');
	} catch (error) {
		/* 
			Same as the following code
			return new Promise((resolve, reject) => {
				reject();
			});
		*/
		return Promise.reject();
	}
	
	return User.findOne({
		'_id': decoded._id,
		'tokens.access': 'auth',
		'tokens.token': token
	});
};

UserSchema.statics.findByCredentials = function(email, password) {
	const User = this;

	return User
		.findOne({ email })
		.then((user) => {
			if (!user) {
				return Promise.reject();
			}

			return new Promise((resolve, reject) => {
				bcrypt.compare(password, user.password, (err, res) => {
					if (res === true) {
						resolve(user);
					} else {
						reject();
					}
				});
			});
		});
};

UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };