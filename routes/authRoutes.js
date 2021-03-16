const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));
	// Once passport tries to authenticate and sees the code attached to the URI, it attempts the callback designated in GoogleStrategy
};
