import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import parks from './parks';

const rootReducer = combineReducers({parks, routing: routerReducer});

export default rootReducer;
