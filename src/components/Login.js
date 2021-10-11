import React from 'react';
import { FaGithub } from 'react-icons/fa';

import './Login.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const Login = () => {
	return (
		<section className='login section'>
			<div className='login-container container'>
				<h1 className='login-title'>Hi there,</h1>
				<span className='login-subtitle'>
					Are you a student of univerisities in Helsinki?
				</span>
				{/* Error message */}
				{/* <span className='login-errors'>Cannot fetch!</span> */}

				<div className='login-actions'>
					{/* Github Authentication link */}

					<a
						className='btn login-btn'
						href={`https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
					>
						<FaGithub style={{ fontSize: '2rem' }} />
						<span>Verify with Github</span>
					</a>
				</div>
			</div>
		</section>
	);
};

export default Login;
