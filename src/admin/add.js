import React, {useEffect, useState} from 'react';
import Axios from 'axios';

import './admin_style.css';

function Admin() {
	const [user_details, set_user_details] = useState([]);

	const getCookieSession = () => {
		var cookie_user_id = "admin_session";
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
			window.location.href = '/admin/login';
		} else {
			let user_id = getCookieSession();

			Axios.post("http://192.168.68.109:3001/admin/details", {user_id:user_id}).then((response) => {
				set_user_details(response.data.user_details);
			});
		}
	}, []);

	const clearCookieSession = () => {
        var expires = "expires=Thu, 18 Dec 2013 12:00:00 UTC";
        document.cookie = "admin_session=; " + expires + ';path=/';
	}

	const signout = () => {
		clearCookieSession();
		window.location.href = '/admin/login';
	}

	return (
		<div className="container">
			<div className="header">
				<div className="title">
					<h1>Healthnow</h1>
				</div>
				<div className="user">
					<i className="fa fa-user"></i> {user_details.name}
				</div>
			</div>
			<div className="sidebar">
				<div className="navigation">
					<ul>
						<a href="/admin"><li><i className="fa fa-user-circle"></i> Users</li></a>
						<a href="#" onClick={signout}><li><i className="fa fa-power-off"></i> Sign out</li></a>
					</ul>
				</div>
			</div>
			<br/>
			<div className="contents">
				<div className="row">
					<div className="form-group"></div>
				</div>
			</div>
		</div>
	);
}

export default Admin;