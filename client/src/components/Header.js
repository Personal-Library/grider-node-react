import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href='/auth/google'>Login With Google</a>
					</li>
				);
			default:
				return (
					<React.Fragment>
						<li>
							<Payments />
						</li>
						<li style={{ padding: '0 10px' }}>Credits: {this.props.auth.credits}</li>
						<li>
							<a href='/api/logout'>Logout</a>
						</li>
					</React.Fragment>
				);
		}
	}

	render() {
		return (
			<nav>
				<div className='nav-wrapper' style={{ paddingLeft: '20px' }}>
					<Link className='left brand-logo' to={this.props.auth ? '/surveys' : '/'}>
						Emaily
					</Link>
					<ul className='right'>{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
