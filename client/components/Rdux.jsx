import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RduxChild from './RduxChild.jsx';
import reducer from '../reducers';


class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {};
        this.store = createStore(reducer);
    }

	render() {
        return <Provider store={this.store}>
        <div className="dispatcher"> 
        <RduxChild>
        </RduxChild><br></br>
        </div></Provider>;
    }
}

export default App;