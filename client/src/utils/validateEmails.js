const removeLastComma = (str) => {
	const trimStr = str.trim();
	if (trimStr[trimStr.length - 1] === ',') {
		return trimStr.substring(0, trimStr.length - 1);
	}
	return trimStr;
};

const validateEmails = (emails) => {
	const lastCommaRemoved = removeLastComma(emails);
	// eslint-disable-next-line
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const invalidEmails = lastCommaRemoved
		.split(',')
		.map((email) => email.trim())
		.filter((email) => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}
};

export default validateEmails;
