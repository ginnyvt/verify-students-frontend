import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth-context';

let logoutTimer;
const AuthContextProvider = (props) => {
	const history = useHistory();
	const storedToken = localStorage.getItem('token');
	const [token, setToken] = useState(storedToken);

	const isAuthenticated = !!token;

	const setTokenHandler = (token, tokenExpTime) => {
		localStorage.setItem('token', token);
		localStorage.setItem('tokenExpTime', tokenExpTime);
		history.push('/');
		logoutTimer = setTimeout(logoutHandler, tokenExpTime - Date.now());
		setToken(token);
	};

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpTime');
		clearTimeout(logoutTimer);
	}, []);

	useEffect(() => {
		if (token) {
			let timeLeft = localStorage.getItem('tokenExpTime') - Date.now();
			if (timeLeft < 6000) timeLeft = 0;
			logoutTimer = setTimeout(logoutHandler, timeLeft);
		}
	}, [token, logoutHandler]);

	const ctxValue = {
		token,
		isAuthenticated,
		setToken: setTokenHandler,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={ctxValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
