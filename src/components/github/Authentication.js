import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Authentication = () => {
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

			if (token) {
				localStorage.setItem('token', token);
				localStorage.setItem('tokenExpTime', Date.now() + 10000);
				history.push('/');
			}
		}
	}, []);
	return (
		<div>
			<h2>Authenticating...</h2>
		</div>
	);
};

export default Authentication;
