import logo from './logo.svg';
import './App.css';
import { BACKEND_URL } from './config/config';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Welcome to Emaily</p>
				<a href={`${BACKEND_URL}/auth/google`} target='_blank' rel='noreferrer'>
					Sign in with Google
				</a>
			</header>
		</div>
	);
}

export default App;
