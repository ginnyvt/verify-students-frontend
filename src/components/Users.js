import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Users.css';
import { universities } from '../utils/univerisities';
import Loader from './Loader';
import AuthContext from '../context/auth-context';

const Users = () => {
	const ctx = useContext(AuthContext);
	const history = useHistory();
	// const storedToken = localStorage.getItem('token');
	// const [token, setToken] = useState(storedToken);
	const [schools, setSchools] = useState([]);
	const [isStudent, setIsStudent] = useState(false);
	const [loading, setLoading] = useState(true);

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

	// const logoutHandler = () => {
	// 	localStorage.clear();
	// 	setToken(null);
	// };

	const displayUserInfo = () => {
		if (!loading && isStudent) {
			return (
				<>
					<p className='user-desc'>You are a student of</p>
					<ul className='schools-list'>
						{schools.map((school) => {
							return <li key={school.name}>{school.name}</li>;
						})}
					</ul>
					<div className='users-actions'>
						<a
							href='https://education.github.com/pack'
							className='btn github-btn'
							target='_blank'
						>
							Github Student Developer Pack
						</a>
						<a className='btn logout-btn' onClick={ctx.logout}>
							Logout
						</a>
					</div>
				</>
			);
		}
		if (!loading && !isStudent) {
			return (
				<>
					<p className='user-desc is-not-student'>
						You are not entitled to any univerisities at the moment.
					</p>
					<div className='users-actions'>
						<a
							href='https://github.com/pricing'
							className='btn github-btn'
							target='_blank'
						>
							Github Pricing
						</a>
						<a className='btn logout-btn' onClick={ctx.logout}>
							Logout
						</a>
					</div>
				</>
			);
		}
	};

	useEffect(async () => {
		// setLoading(false);
		const userEmails = await getUserEmails(ctx.token);
		setLoading(false);
		const userSchools = getSchools(userEmails);
		if (userSchools.length) {
			setSchools(getSchools(userEmails));
			setIsStudent(true);
		}
	}, []);

	return (
		<section className='users section'>
			<div className='container users-container'>
				<h2>Welcome back</h2>
				{loading && (
					<div className='loader-container-2'>
						<Loader />
					</div>
				)}
				<div className='user-info'>{displayUserInfo()}</div>
			</div>
		</section>
	);
};

export default Users;
