const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.register = (req, res) => {
	var user = new User();
	user.username = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save((err, res) => {
		console.log(res.email);
		var token;
		token = user.generateJWT();
		res.status(200);
		res.json({
			"token": token
		});
	});
};

module.exports.login = (req, res) => {
	passport.authenticate('local', (err, user, info) => {
		var token;

		if (err) {
			res.status(404).json(err);
			return;
		}

		if (user) {
			token = user.generateJWT();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};