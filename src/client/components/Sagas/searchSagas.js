import {ActionsConstants} from '../constants'
import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {StoreActions} from "../actions";

function* searchUsersRequest(action) {
    console.log('Saga=', action);
    try {
        const uri = '/api/searchUsers?username=' + action.payload.username + '&fullName=' + action.payload.fullName +
            '&location=' + action.payload.location;
        const res = yield call(fetch, uri);
        if (res.status === 200) {
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleSearchUsersResponse(json));
        }
        else {
            throw(res.error);
        }
    } catch (e) {
        console.error(e);
    }
}

function* SearchUsersSaga() {
    yield takeLatest(ActionsConstants.SEARCH_USERS_REQUEST, searchUsersRequest);
}

function* searchRestaurantsRequest(action) {
    console.log('Saga=', action);
    try {
        const uri = '/api/searchRestaurants?name=' + action.payload.name + '&type=' + action.payload.type +
            '&location=' + action.payload.location + '&score=' + action.payload.score;
        const res = yield call(fetch, uri);
        if (res.status === 200) {
            console.log('res ', res);
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleSearchRestaurantsResponse(json));
        }
        else {
            throw(res.error);
        }
    } catch (e) {
        console.error(e);
    }
}

function* SearchRestaurantsSaga() {
    yield takeLatest(ActionsConstants.SEARCH_RESTAURANTS_REQUEST, searchRestaurantsRequest);
}

function* getRestaurantsRequest(action) {
    console.log('Saga=', action);
    try {
        const res = yield call(fetch, '/api/getRestaurants');
        if (res.status === 200) {
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleGetRestaurantsResponse(json));
        }
        else {
            throw(res.error);
        }
    } catch (e) {
        console.error(e);
    }
}

function* GetRestaurantsSaga() {
    yield takeLatest(ActionsConstants.GET_RESTAURANTS_REQUEST, getRestaurantsRequest);
}


export default function* SearchSagas() {
    yield all([
        SearchUsersSaga(),
        SearchRestaurantsSaga(),
        GetRestaurantsSaga(),
    ])
};