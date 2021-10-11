import React, { useContext } from 'react';
import AuthContext from '../context/auth-context';

import Login from './Login';
import Users from './Users';

const Home = () => {
	const ctx = useContext(AuthContext);
	// const storedToken = localStorage.getItem('token');
	// const storedTokenExpTime = localStorage.getItem('tokenExpTime');
	// const validToken = Date.now() < storedTokenExpTime;

	// if (!validToken) {
	// 	console.log('Hello');
	// 	localStorage.removeItem('token');
	// 	localStorage.removeItem('tokenExpTime');
	// }

	return ctx.isAuthenticated ? <Users /> : <Login />;
};

export default Home;
