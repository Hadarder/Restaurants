import {ActionsConstants} from '../constants'
import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {StoreActions} from "../actions";

function* signInRequest(action) {
    console.log('Saga=', action);
    try {
        const res = yield call(fetch, '/api/signIn',
            {
                method: 'POST',
                body: JSON.stringify(action.payload.user),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        yield put(StoreActions.handleSignInResponse(res, action.payload.user.username));
    } catch (e) {
        console.error(e);
    }
}

function* SignInSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.SIGN_IN_REQUEST, signInRequest);
}

function* signOutRequest(action) {
    console.log('Saga=', action);
    try {
        yield call(fetch, '/api/signOut', {credentials: 'same-origin'});
        yield put(StoreActions.signOutStore());
    } catch (e) {
        console.error(e);
    }
}

function* SignOutSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.SIGN_OUT_REQUEST, signOutRequest);
}

function* signUpRequest(action) {
    console.log('Saga=', action);
    try {
        const res = yield call(fetch, '/api/signUp',
            {
                method: 'POST',
                body: JSON.stringify(action.payload.user),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        yield put(StoreActions.handleSignInResponse(res, action.payload.user.username));
    } catch (e) {
        console.error(e);
    }
}

function* SignUpSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.SIGN_UP_REQUEST, signUpRequest);
}

function* userExistsRequest(action) {
    console.log('Saga=', action);
    try {
        const uri = '/api/userExists/' + action.payload.username;
        const res = yield call(fetch, uri);
        yield put(StoreActions.handleUserExistsResponse(res));

    } catch (e) {
        console.error(e);
    }
}

function* UserExistsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeLatest(ActionsConstants.USER_EXISTS_REQUEST, userExistsRequest);
}

function* isLoggedInRequest(action) {
    console.log('Saga=', action);
    try {
        const res = yield call(fetch, '/api/isLoggedIn');
        if (res.status === 200) {
            const json = yield call([res, 'json']);
            yield put(StoreActions.handleSignInResponse(res, json.username))
        }
        else yield put(StoreActions.signOutStore());

    } catch (e) {
        console.error(e);
    }
}

function* IsLoggedInSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ActionsConstants.IS_LOGGED_IN_REQUEST, isLoggedInRequest);
}

export default function* SessionSagas() {
    yield all([
        SignInSaga(),
        SignOutSaga(),
        SignUpSaga(),
        UserExistsSaga(),
        IsLoggedInSaga(),
    ])
};