const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Pull a certain model out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientId,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			// Check to see if we have a user with profile.id
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				// we already have a record with the profile.id
				return done(null, existingUser);
			}
			// make new user if user does not exist
			const newUser = await new User({ googleId: profile.id }).save();
			done(null, newUser);
		}
	)
);
