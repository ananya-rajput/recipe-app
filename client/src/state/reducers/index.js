import { combineReducers } from 'redux';

import tabsReducer from './Tabs';

const reducers = combineReducers({
	tabs: tabsReducer
});

export default reducers;
