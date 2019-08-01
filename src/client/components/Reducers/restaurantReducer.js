import initialState from '../../initialState';
import {ActionsConstants} from '../constants.js';
import {List} from "immutable";

const RestaurantReducer = (state = initialState.restaurant, action) => {
    const handleRestaurantDetailsResponse = (response) => {
        state = state.set('name', response.name);
        state = state.set('type', response.type);
        state = state.set('location', response.location);
        state = state.set('picture', response.picture);
        state = state.set('score', response.score);
        return state.set('reviews', new List(response.reviews));
    };

    console.log('RestaurantReducerState=', state);
    console.log('Restaurant RECEIVED ACTION:', action);
    switch (action.type) {
        case ActionsConstants.HANDLE_RESTAURANT_DETAILS_RESPONSE:
            return handleRestaurantDetailsResponse(action.payload.response);
        default:
            return state;
    }
};

export default RestaurantReducer;