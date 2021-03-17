const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
// Make sure that the User models are required first so that passport can use them
require('./services/passport');

mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Mongo connection is live!');
});

const app = express();

const THIRTY_DAYS = 2592000000;
app.use(
	cookieSession({
		// 30 days
		maxAge: THIRTY_DAYS,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Express is live on port ${PORT}`);
});
