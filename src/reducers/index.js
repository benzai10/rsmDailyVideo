import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FocusFormReducer from './FocusFormReducer';
import FocusReducer from './FocusReducer';

export default combineReducers({
    auth: AuthReducer,
    focus: FocusFormReducer,
    focus_entries: FocusReducer
})
