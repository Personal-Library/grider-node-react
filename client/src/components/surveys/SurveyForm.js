// SurveyForm shows a form for a user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
	renderFields() {
		return (
			<div style={{ marginTop: '20px' }}>
				{formFields.map(({ label, name }, i) => (
					<Field label={label} name={name} type='text' component={SurveyField} key={i} />
				))}
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to='/surveys' className='red btn'>
						Cancel
					</Link>
					<button className='btn right' type='submit'>
						Next
						<i className='material-icons right'>done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	// Validate each email with RegEx
	errors.recipients = validateEmails(values.recipients || '');

	// Validate that each field contains text. This will override the above error for emails
	formFields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}`;
		}
		if (!values['recipients']) {
			errors.recipients = 'You must provide at least one valid email';
		}
	});

	// If ReduxForm gets this error object back and it is empty then it will assume everything is valid
	return errors;
};

export default reduxForm({ validate, form: 'surveyForm', destroyOnUnmount: false })(SurveyForm);
