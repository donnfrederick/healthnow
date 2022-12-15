import React, {useEffect, useState} from 'react';
import Axios from 'axios';

import './style.css';

import Details from '../components/details.js';

function User() {
	const [user_details, set_user_details] = useState([]);

	const getCookieSession = () => {
		var cookie_user_id = "user_session";
        var name = cookie_user_id + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                 return c.substring(name.length, c.length);
            }
        }
        return "";
	}

	useEffect(() => {
		if (getCookieSession() === '') {
			window.location.href = '/login';
		} else {
			let user_id = getCookieSession();

			Axios.post("http://192.168.68.109:3001/user/details", {user_id:user_id}).then((response) => {
				set_user_details(response.data.user_details);
			});
		}
	}, []);

	const clearCookieSession = () => {
        var expires = "expires=Thu, 18 Dec 2013 12:00:00 UTC";
        document.cookie = "user_session=; " + expires + ';path=/';
	}

	const signout = () => {
		clearCookieSession();
		window.location.href = '/login';
	}

	return (
		<div className="container">
			<form>
				<div className="icon"><i className="far fa-user"></i></div>
				<Details dataClass="form-group" dataDetails={user_details} />
				<div className="form-group">
					<button onClick={signout}><i className="fa fa-power-off"></i> Sign out</button>
				</div>
			</form>
		</div>
	);
}

export default User;