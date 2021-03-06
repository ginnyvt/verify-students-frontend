import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Authentication.css';
import AuthContext from '../../context/auth-context';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Authentication = () => {
	const ctx = useContext(AuthContext);
	const history = useHistory();

	const getAccessToken = async (code) => {
		try {
			const { data } = await axios.get(
				`${SERVER_URL}/access_token?code=${code}`
			);
			// console.log(data);
			return data.token;
		} catch (error) {
			console.log(error.response);
			history.push('/');
		}
	};

	useEffect(async () => {
		const callbackURL = window.location.href;
		const hasCode = callbackURL.includes('?code=');

		if (hasCode) {
			const code = callbackURL.split('?code=')[1];
			const token = await getAccessToken(code);
			const tokenExpTime = Date.now() + 60000;

			if (token) {
				// localStorage.setItem('token', token);
				// localStorage.setItem('tokenExpTime', Date.now() + 36000);
				// history.push('/');
				ctx.setToken(token, tokenExpTime);
			}
		}
	}, []);
	return (
		<div className='loader-container-1'>
			{/* <Loader /> */}
			<p>AUTHENTICATING...</p>
		</div>
	);
};

export default Authentication;
