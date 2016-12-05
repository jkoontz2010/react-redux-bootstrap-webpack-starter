import {createStore, compose, applyMiddleware } from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk  from 'redux-thunk';
import promiseMiddleware  from './middleware/redux-promise';

// import the root reducer 
import rootReducer from './reducers/index';

// create an object for the default data 
const defaultState = {
	area: null,
	parks: []
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk, promiseMiddleware));


export  const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
