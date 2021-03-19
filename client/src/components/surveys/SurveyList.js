import React from 'react';
import { fetchSurveys } from '../../actions';
import { connect } from 'react-redux';

class SurveyList extends React.Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys = () => {
		return this.props.surveys.reverse().map((survey) => {
			return (
				<div
					key={survey._id}
					className='card blue-grey darken-1'
					style={{ width: 'calc(50% - 40px)', flexShrink: '0', margin: '20px 20px' }}
				>
					<div className='card-content white-text' style={{ paddingBottom: '100px' }}>
						<span className='card-title'>{survey.title}</span>
						<p>{survey.body}</p>
						<p className='right'>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className='card-action amber-text'>
						<p>Yes: {survey.yes}</p>
						<p>No: {survey.no}</p>
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
				{this.renderSurveys()}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ surveys: state.surveys });

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
