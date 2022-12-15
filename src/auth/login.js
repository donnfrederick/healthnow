import {useState} from 'react';
import Axios from 'axios';
import './style.css';

import Error from '../components/error.js';

function Login() {
	const [username,setUsername] = useState("");
	const [password,setPassword] = useState("");

	const [error, setError] = useState("");

	const setCookieSession = (user_id) => {
		let date = new Date();
		date.setTime(date.getTime() + (90*24*60*60*1000));

		let expires = "expires="+date.toUTCString();
		document.cookie = "user_session = " + user_id + "; " + expires + ";path=/";
	}

	const login = (e) => {
		e.preventDefault();

		if (username !== '' && password !== '') {
			Axios.post("http://192.168.68.109:3001/auth/login", {
				username:username,
				password:password
			}).then((response) => {
				if (response.data.result === 'ok') {
					setCookieSession(response.data.user_id);
					window.location.href = '/user';
				} else {
					setError('Please check username & password');
				}
			});
		} else {
			setError('Please fill out all fields');
		}
	}

	return (
		<div className="container">
			<form>
				<div className="icon"><i className="far fa-user"></i></div>
				<h4>Sign in your account</h4>
				<div className="form-group">
					<input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value);}}/>
				</div>
				<div className="form-group">
					<input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value);}}/>
				</div>
				<Error error={error} domClass="form-group" />
				<div className="form-group">
					<button type="submit" onClick={login}>Sign in</button>
				</div>
			</form>
		</div>
	);
}

export default Login;