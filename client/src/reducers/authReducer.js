import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			// Either return the user object or return the bool false
			return action.payload || false;
		default:
			// If we have not gotten a response from the API, return null
			return state;
	}
};

export default authReducer;
