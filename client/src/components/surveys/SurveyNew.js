// SurveyNew shows SurveyForm and SurveyFormReview
import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
	constructor(props) {
		super(props);

		this.state = { showFormReview: false };
	}

	renderContent() {
		return this.state.showFormReview ? (
			<SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
		) : (
			<SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

/**
 * We aren't really using the reduxForm helper here for anything else other than
 * ensuring that when we do unmount the SurveyForm component all the form data is reset.
 * This is due to the fact that we did not pass destroyOnUnmount: true, this acts as if it
 * is a completely different 'state' of form
 */
export default reduxForm({ form: 'surveyForm' })(SurveyNew);
