const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Pull a certain model out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		(accessToken, refreshToken, profile, done) => {
			// Check to see if we have a user with profile.id
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					// we already have a record with the profile.id
					done(null, existingUser);
				} else {
					// make new user if user does not exist
					new User({ googleId: profile.id }).save().then((newUser) => done(null, newUser));
				}
			});
		}
	)
);
