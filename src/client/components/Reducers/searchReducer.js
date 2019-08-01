import initialState from '../../initialState';
import {ActionsConstants} from '../constants.js';
import getDistance from 'geolib/es/getDistance'
import {List} from 'immutable';


const SearchReducer = (state = initialState.search, action) => {
    const updateRestaurantsGrade = (lat, lon, value, restaurants) => {
        const userLocation = {
            lat: lat, lon: lon
        };
        let updated = restaurants.map(rest => {
            let restLocation = {
                lat: rest.lat, lon: rest.lon
            };
            let dist = -(getDistance(userLocation, restLocation) / 1000);
            rest.grade = value * dist + (1 - value) * rest.description1;
            return rest;
        });
        return state.set('restaurants', updated);
    };

    console.log('SearchReducerState=', state);
    console.log('Search RECEIVED ACTION:', action);
    switch (action.type) {
        case ActionsConstants.HANDLE_SEARCH_USERS_RESPONSE:
            return state.set('users', new List(action.payload.response));
        case ActionsConstants.HANDLE_SEARCH_RESTAURANTS_RESPONSE:
            return state.set('restaurants', new List(action.payload.response));
        case ActionsConstants.UPDATE_RESTAURANTS_GRADE:
            return updateRestaurantsGrade(action.payload.lat, action.payload.lon, action.payload.value, action.payload.restaurants);
        case ActionsConstants.HANDLE_GET_RESTAURANTS_RESPONSE:
            return state.set('restaurantsNames', new List(action.payload.response));
        default:
            return state;
    }
};

export default SearchReducer;