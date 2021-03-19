// URL is a default module included with Node
const { URL } = require('url');
const _ = require('lodash');
const { Path } = require('path-parser');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		console.log(req.body)
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, response: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.response': true },
						lastResponded: new Date(),
					}
				).exec();
			})
			.value();

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title: title,
			subject: subject,
			body: body,
			recipients: recipients.split(',').map((recipient) => ({ email: recipient.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});

		try {
			// Send mailer using SendGrid
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();

			// After mailer is sent, deduct credits and save updated user to MongoDB
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			// Either finish the http request or catch the error
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
