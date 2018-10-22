const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');

const User = mongoose.model('User');

module.exports.register = (req, res) => {
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	var tSalt = crypto.randomBytes(16).toString('hex');
	user.salt = tSalt;
	user.hash = user.generateHash(req.body.password, tSalt);

	user.save((err) => {
		var token;
		token = user.generateJWT();
		res.status(200);
		res.json({
			"token": token,
			"username": user.username
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
				"token" : token,
				"username": user.username
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};