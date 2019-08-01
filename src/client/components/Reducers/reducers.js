import {combineReducers} from 'redux';
import SessionReducer from './sessionReducer';
import ProfileReducer from './profileReducer';
import SearchReducer from './searchReducer';
import RestaurantReducer from './restaurantReducer';
import ReviewReducer from './reviewReducer';

export default combineReducers({
    session: SessionReducer,
    profile: ProfileReducer,
    search: SearchReducer,
    restaurant: RestaurantReducer,
    review: ReviewReducer
});
