import { createContext } from 'react';

const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	setToken: (token, tokenExpTime) => {},
	logout: () => {},
});

export default AuthContext;
