const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/surveys');
	});
	// Once passport tries to authenticate and sees the code attached to the URI, it attempts the callback designated by GoogleStrategy, after the passport middleware calls next the user is redirected to the surveys page (third argument)

	app.get('/api/logout', (req, res) => {
		// .logout() is a function that is automatically attached to the req object by passport
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.json(req.user);
	});
};
