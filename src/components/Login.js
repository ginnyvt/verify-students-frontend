import React from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const Login = () => {
	return (
		<div>
			<h2>Are you a student?</h2>
			<a
				href={`https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
			>
				Authenticated with Github
			</a>
		</div>
	);
};

export default Login;
