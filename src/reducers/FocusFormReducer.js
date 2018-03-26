import {
    FOCUS_UPDATE,
    FOCUS_CREATE,
    FOCUS_SAVE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    title: '',
    description: ''
}

export default (state=INITIAL_STATE, action) => {
    console.log(action)
    
    switch (action.type) {
    case FOCUS_UPDATE:
	return { ...state, [action.payload.prop]: action.payload.value };
    case FOCUS_CREATE:
	return INITIAL_STATE;
    case FOCUS_SAVE_SUCCESS:
	return INITIAL_STATE;
    default:
	return state
    }
}
