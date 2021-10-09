import React from 'react';

import Login from './Login';
import Users from './Users';

const Home = () => {
	const storedToken = localStorage.getItem('token');
	const storedTokenExpTime = localStorage.getItem('tokenExpTime');
	const validToken = Date.now() < storedTokenExpTime;

	if (!validToken) {
		console.log('Hello');
		localStorage.clear();
	}

	return storedToken && validToken ? <Users /> : <Login />;
};

export default Home;
