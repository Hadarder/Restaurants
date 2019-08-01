import initialState from '../../initialState';
import {ActionsConstants} from '../constants.js';
import {List} from 'immutable';

const ProfileReducer = (state = initialState.profile, action) => {
    const handleUserDetailsResponse = (json) => {
        state = state.set('editable', json.editable);
        state = state.set('username', json.user.username);
        state = state.set('fullName', json.user.fullName);
        state = state.set('picture', json.user.picture);
        state = state.set('location', json.user.location);
        return state.set('reviews', List(json.reviews));
    };

    const removeReviewFromProfile = (reviews, id) => {
        const rest = reviews.filter(rev => rev._id != id);
        return state.set('reviews', rest);
    };

    console.log('ProfileReducerState=', state);
    console.log('Profile RECEIVED ACTION:', action);
    switch (action.type) {
        case ActionsConstants.HANDLE_USER_DETAILS_RESPONSE:
            return handleUserDetailsResponse(action.payload.response);
        case ActionsConstants.UPDATE_PROFILE_DETAILS:
            state = state.set('username', action.payload.username);
            return state.set('location', action.payload.location);
        case ActionsConstants.DELETE_REVIEW_FROM_PROFILE:
            return removeReviewFromProfile(action.payload.reviews, action.payload.id);
        default:
            return state;
    }
};

export default ProfileReducer;