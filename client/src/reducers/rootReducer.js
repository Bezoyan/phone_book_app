import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import groupReducer from './groupReducer';

const rootReducer = combineReducers({
  contactReducer,
  groupReducer
});

export default rootReducer;
