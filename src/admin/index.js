import React, {useEffect, useState} from 'react';
import Axios from 'axios';

import './admin_style.css';

function Admin() {
	const [user_details, set_user_details] = useState([]);
	const [users, set_users] = useState([]);
	const [checked, set_check] = useState([]);

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

		Axios.get("http://192.168.68.109:3001/admin/users", {}).then((response) => {
			set_users(response.data.users);
		});
	}, []);

	const clearCookieSession = () => {
        var expires = "expires=Thu, 18 Dec 2013 12:00:00 UTC";
        document.cookie = "admin_session=; " + expires + ';path=/';
	}

	const signout = () => {
		clearCookieSession();
		window.location.href = '/admin/login';
	}

	const checkChange = (e) => {
		let checkitems = checked;
		if (e.target.checked === true) {
			checkitems.push(e.target.value);
			set_check(checkitems);
		} else {
			let index = checkitems.indexOf(e.target.value);

			checkitems.splice(index, 1);
			set_check(checkitems);
		}

		if (checked.length !== 0) {
			document.getElementById('bulk_delete').classList.add('active');
		} else {
			document.getElementById('bulk_delete').classList.remove('active');
		}
	}

	const deleteChecked = () => {
		checked.map((value, key) => {
			Axios.delete("http://192.168.68.109:3001/admin/users/delete/"+value).then((response) => {
				console.log(response.data.result);
				relist();
			});
		});
	}

	const deleteOne = (e) => {
		const user_id = e.target.getAttribute('data-value');

		console.log(user_id);

		Axios.delete("http://192.168.68.109:3001/admin/users/delete/"+user_id).then((response) => {
			console.log(response.data.result);
			relist();
		});
	}

	const relist = () => {
		Axios.get("http://192.168.68.109:3001/admin/users").then((response) => {
			set_users(response.data.users);
		});
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
					<button id="add_users" onClick={() => {window.location.href = '/admin/users/add'}} className="add">Add</button>
					<button id="bulk_delete" className="bulk" onClick={deleteChecked}>Remove</button>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Address</th>
								<th>Contact Number</th>
								<th>Email</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => 
							<tr>
								<td className="check">
									<input type="checkbox" onClick={checkChange} value={user['id']} />
									{user['id']}
								</td>
								<td>{user['first_name']} {user['last_name']}</td>
								<td>{user['address']} {user['post_code']}</td>
								<td>{user['phone_number']}</td>
								<td>{user['email']}</td>
								<td className="action">
									<button className="edit"><i className="fa fa-edit"></i></button>
									<button onClick={deleteOne} data-value={user['id']} className="delete"><i onClick={deleteOne} data-value={user['id']} className="fa fa-trash"></i></button>
								</td>
							</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Admin;