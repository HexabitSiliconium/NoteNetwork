const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

const User = mongoose.model('User');

//Defining passport strategy
passport.use(new LocalStrategy({
	//For now, username is email
		usernameField: 'email'
	}, (email, password, done) => {
		//Finds user in database with email
		User.findOne({ email: email }, (err, user) => {
			//Err handler
			if (err) {
				return done(err);
			}
			//If user not found, spits out message
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}
			//Checks against user hash, if invalid, spits out message
			var salt = user.salt;
			if ((user.hash === user.generateHash(password, salt)) == false) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			//If user found and password is correct
			return done(null, user);
		})
	}
));