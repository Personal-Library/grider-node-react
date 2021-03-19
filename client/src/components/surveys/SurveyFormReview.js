// SurveyFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
	const reviewFields = formFields.map(({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className='yellow btn-flat white-text darken-3'
				onClick={onCancel}
				style={{ marginTop: '20px' }}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues)}
				className='green text-white btn-flat right'
			>
				Send Survey
				<i className='material-icons right'>email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formValues: state.form.surveyForm.values,
	};
};

export default connect(mapStateToProps, actions)(SurveyFormReview);
