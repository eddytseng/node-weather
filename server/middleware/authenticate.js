const { User } = require('../user/user.model');

const authenticate = (req, res, next) => {
	const token = req.header('x-auth');
	
	User
		.findByToken(token)
		.then((user) => {
			if (!user) {
				return Promise.reject();
			}
	
			req.user = user;
			req.token = token;
			next();
		})
		.catch((error) => {
			res.sendStatus(401);
		});
};

module.exports = authenticate;