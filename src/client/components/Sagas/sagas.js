import { all } from 'redux-saga/effects'
import SessionSagas from './sessionSagas'
import ProfileSagas from './profileSagas'
import SearchSagas from './SearchSagas'
import RestaurantSagas from './RestaurantSagas'
import ReviewSagas from './ReviewSagas'

export default function* Sagas() {
    yield all([
        SessionSagas(),
        ProfileSagas(),
        SearchSagas(),
        RestaurantSagas(),
        ReviewSagas()
    ])
}
