import {ActionsConstants} from '../constants'
import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {StoreActions} from "../actions";

function* restaurantDetailsRequest(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, "api/getRestaurantDetails/" + action.payload.name);
        if (res.status === 200) {
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleRestaurantDetailsResponse(json));
        }
        else {
            throw res.error;
        }
    } catch (e) {
        console.error("err " + e);
    }
}

function* RestaurantDetailsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.RESTAURANT_DETAILS_REQUEST, restaurantDetailsRequest);
}

export default function* RestaurantSagas() {
    yield all([
        RestaurantDetailsSaga()
    ])
};