import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './components/github/Authentication';
import Home from './components/Home';
import AuthContextProvider from './context/AuthContextProvider';

const App = () => {
	return (
		<AuthContextProvider>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/callback' component={Authentication} />
			</Switch>
		</AuthContextProvider>
	);
};

export default App;
