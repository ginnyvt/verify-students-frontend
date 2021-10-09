import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './components/github/Authentication';
import Home from './components/Home';

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/callback' component={Authentication} />
			</Switch>
		</>
	);
};

export default App;
