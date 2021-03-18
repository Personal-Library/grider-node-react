module.exports = (req, res, next) => {
	if (req.user.credits <= 0) {
		return res
			.status(403)
			.send({ error: 'You must have at least 1 credit before making a new survey.' });
	}
	next();
};
