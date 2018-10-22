const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
		usernameField: 'email'
	}, (email, password, done) => {
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}
			var salt = user.salt;
			if ((user.hash === user.generateHash(password, salt)) == false) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		})
	}
));