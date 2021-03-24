import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

const STRIPE_PUBLIC =
	'pk_test_51IW5ZmLHWLJfT1Jyh4kFJ4dM82dtdeR9BhLg43UFPtglU7jc3gtZhC4IiFboh1eyF3uArHYCpwjwaTDo7z2N3VhL00lInAiDsP';

class Payments extends React.Component {
	render() {
		return (
			<StripeCheckout
				name='Emaily'
				description='$5 for 5 email credits'
				amount={500}
				token={(token) => this.props.handleToken(token)}
				stripeKey={STRIPE_PUBLIC}
			>
				<button className='btn'>Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, { handleToken })(Payments);
