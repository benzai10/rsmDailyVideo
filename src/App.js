import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
	const config = {
	    apiKey: 'AIzaSyCsipqHe7NYeFHHtA8C1w0yhBCLSLd20Ew',
	    authDomain: 'rocky-station-apps.firebaseapp.com',
	    databaseURL: 'https://rocky-station-apps.firebaseio.com',
	    projectId: 'rocky-station-apps',
	    storageBucket: 'rocky-station-apps.appspot.com',
	    messagingSenderId: '209506072799'
	};
	firebase.initializeApp(config);
    }
    
    render() {
	const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
	
	return (
	    <Provider store={store}>
	      <Router />
	    </Provider>
	)
    }
}

export default App;
