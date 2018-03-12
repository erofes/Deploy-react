import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import { routerReducer} from 'react-router-redux';

const history = createBrowserHistory();

import App from './client/components/App.jsx';
import Rdux from './client/components/Rdux.jsx';

ReactDOM.render(
		<Router history={history}>
		<div>
		<ul>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
		</ul>

		<hr/>
			<Route exact path='/' component={Rdux}/>
			<Route exact path='/about' component={App}/>
		</div>
		</Router>,

	document.getElementById('react-view')
);