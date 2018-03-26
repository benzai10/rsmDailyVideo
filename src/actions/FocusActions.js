import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    FOCUS_UPDATE,
    FOCUS_CREATE,
    FOCUS_SAVE_SUCCESS,
    FOCUS_FETCH_SUCCESS
} from './types';

export const focusUpdate = ({ prop, value }) => {
    return {
	type: FOCUS_UPDATE,
	payload: { prop, value }
    }
}

export const focusCreate = ({ title, description }) => {
    const { currentUser } = firebase.auth()

    return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/focus_entries`)
	    .push({ title, description })
	    .then(() => {
		dispatch({ type: FOCUS_CREATE })
		Actions.pop()
	    })
    }
}

export const focusSave = ({ title, description }, uid ) => {
    const { currentUser } = firebase.auth()

    return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/foucs_entries/${uid}`)
    }
}

export const focusFetch = () => {
    const { currentUser } = firebase.auth()

    return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/focus_entries`)
	    .on('value', snapshot => {
		dispatch({ type: FOCUS_FETCH_SUCCESS, payload: snapshot.val() })
	    })
    }
}
