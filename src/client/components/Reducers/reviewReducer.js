import initialState from '../../initialState';
import {ActionsConstants} from '../constants.js';
// const {} = require('immutable');
import {List} from 'immutable';

const ReviewReducer = (state = initialState.review, action) => {

    const handleGetReviewResponse = (response) => {
        state = state.set('restaurant', response.restaurant);
        state = state.set('bathroom', response.bathroom);
        state = state.set('staff', response.staff);
        state = state.set('clean', response.clean);
        state = state.set('drive', response.drive);
        state = state.set('delivery', response.delivery);
        return state.set('food', response.food);
        // return state.set('pictures', pictures);
    };

    console.log('ReviewReducerState=', state);
    console.log('Review RECEIVED ACTION:', action);
    switch (action.type) {
        case ActionsConstants.HANDLE_GET_REVIEW_RESPONSE:
            return handleGetReviewResponse(action.payload.response);
        case ActionsConstants.UPDATE_REVIEW_CRITERIA:
            return handleGetReviewResponse(action.payload.criteria);
        default:
            return state;
    }
};

export default ReviewReducer;