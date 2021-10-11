import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { universities } from '../utils/univerisities';

const Users = () => {
	const history = useHistory();
	const storedToken = localStorage.getItem('token');

	const [schools, setSchools] = useState([]);

	// if (!storedToken) {
	// 	history.push('/');
	// }

	const getUserEmails = async (token) => {
		const { data } = await axios({
			method: 'GET',
			url: 'https://api.github.com/user/emails',
			headers: {
				accept: 'application/vnd.github.v3+json',
				authorization: `token ${token}`,
			},
		});
		return data;
	};

	const getSchools = (userEmails) => {
		let schools = [];

		const userEmailsFormat = userEmails.map((userEmail) => {
			return '@' + userEmail.email.split('@')[1];
		});

		userEmailsFormat.map((userEmailFormat) => {
			return universities.filter((university) => {
				return Object.keys(university).some((uniEmailFormat) => {
					if (university[uniEmailFormat].includes(userEmailFormat)) {
						schools.push(university);
					}
				});
			});
		});

		return schools;
	};

	useEffect(async () => {
		const userEmails = await getUserEmails(storedToken);
		setSchools(getSchools(userEmails));
	}, []);
	return (
		<div>
			<h2>Users</h2>
			<ul>
				{schools.length > 0 &&
					schools.map((school) => {
						return <li key={school.name}>{school.name}</li>;
					})}
			</ul>
		</div>
	);
};

export default Users;
