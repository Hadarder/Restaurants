import {ActionsConstants} from '../constants'
import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {StoreActions} from "../actions";

function* addReviewRequest(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, "api/addReview",
            {
                method: 'POST',
                body: JSON.stringify(action.payload.review),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        if (res.status !== 200) {
            throw res.error;
        }
    } catch (e) {
        console.error("err " + e);
    }
}

function* AddReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.ADD_REVIEW_REQUEST, addReviewRequest);
}

function* getReviewRequest(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, "api/getReview/" + action.payload.id);
        if (res.status === 200) {
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleGetReviewResponse(json));
        }
        else {
            throw res.error;
        }
    } catch (e) {
        console.error("err " + e);
    }
}

function* GetReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.GET_REVIEW_REQUEST, getReviewRequest);
}

function* editReviewRequest(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, "api/editReview",
            {
                method: 'POST',
                body: JSON.stringify(action.payload.review),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        if (res.status !== 200) {
            throw res.error;
        }
    } catch (e) {
        console.error("err " + e);
    }
}

function* EditReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.EDIT_REVIEW_REQUEST, editReviewRequest);
}

function* deleteReviewRequest(action) {
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, "api/deleteReview",
            {
                method: 'POST',
                body: JSON.stringify({
                        id: action.payload.id,
                        restaurant: action.payload.restaurant
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        if (res.status == 200) {
            yield put(StoreActions.removeReviewFromProfile(action.payload.reviews, action.payload.id));
        }
        else throw res.error;

    } catch (e) {
        console.error("err " + e);
    }
}

function* DeleteReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.DELETE_REVIEW, deleteReviewRequest);
}


export default function* ReviewSagas() {
    yield all([
        AddReviewSaga(),
        EditReviewSaga(),
        GetReviewSaga(),
        DeleteReviewSaga()
    ])
};