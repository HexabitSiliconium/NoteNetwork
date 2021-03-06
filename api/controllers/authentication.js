const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');

const User = mongoose.model('User');
//Controller endpoint to handle user authentication

//Endpoint for registration
module.exports.register = (req, res) => {
	var user = new User();//Instantiates new User model for Mongo
	//Setting user fields according to request body
	user.username = req.body.username;
	user.email = req.body.email;
	//Generating salt and hash based on password
	var tSalt = crypto.randomBytes(16).toString('hex');
	user.salt = tSalt;
	user.hash = user.generateHash(req.body.password, tSalt);
	//Saves user
	user.save((err) => {
		//Generates a token and sends it as a response
		//Username also sent back
		var token;
		token = user.generateJWT();
		res.json({
			"token": token,
			"username": user.username
		}).status(200);
	});
};
//Endpoint for login
module.exports.login = (req, res) => {
	//Authenticates according to passport local strategy
	passport.authenticate('local', (err, user, info) => {
		var token;
		//Unfound
		if (err) {
			res.json(err).status(404);
		}
		//If successful, sends back token and username
		if (user) {
			token = user.generateJWT();
			res.json({
				"token" : token,
				"username": user.username
			}).status(200);
		} else {
			//If unsuccessful, send back 401 status
			res.json(info).status(401);
		}
	})(req, res);
};