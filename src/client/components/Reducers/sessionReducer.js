import initialState from '../../initialState';
import {ActionsConstants} from '../constants.js';

const SessionReducer = (state = initialState.session, action) => {
    const handleSignInResponse = (res, username) => {
        if (res.status === 200) {
            // state = state.set('validSignIn', true);
            // state = state.set('usernameExists', false);
            state = state.set('username', username);
            return state.set('loggedIn', true);
        } else if (res.status === 401) {
            return state.set('validSignIn', false);
        } else {
            const error = new Error(res.error);
            throw error;
        }
    };

    const handleUserExistsResponse = (res) => {
        if (res.status === 200) {
            return state.set('usernameExists', true);
        }
        else if (res.status === 204) {
            return state.set('usernameExists', false);
        } else {
            const error = new Error(res.error);
            throw error;
        }
    };

    console.log('SessionReducerState=', state);
    console.log('Session RECEIVED ACTION:', action);
    switch (action.type) {
        // case ActionsConstants.SIGN_IN_STORE:
        //     return state.set('loggedIn', true);
        case ActionsConstants.SET_USERNAME:
            return state.set('username', action.payload.username);
        case ActionsConstants.SIGN_OUT_STORE:
            state = state.set('loggedIn', false);
            return state.set('username', "");
        case ActionsConstants.HANDLE_SIGN_IN_RESPONSE:
            return handleSignInResponse(action.payload.response, action.payload.username);
        case ActionsConstants.HANDLE_USER_EXISTS_RESPONSE:
            return handleUserExistsResponse(action.payload.response);
        default: //otherwise state is lost!
            return state;
    }
};

export default SessionReducer
