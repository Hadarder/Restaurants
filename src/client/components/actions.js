import {ActionsConstants} from './constants.js';

function signOutStore() {
    return {
        type: ActionsConstants.SIGN_OUT_STORE,
        payload: {}
    }
}

function setUsername(username) {
    return {
        type: ActionsConstants.SET_USERNAME,
        payload: {username: username}
    }
}

function handleSignInResponse(response, username) {
    return {
        type: ActionsConstants.HANDLE_SIGN_IN_RESPONSE,
        payload: {
            response: response,
            username: username
        }
    }
}

function handleUserExistsResponse(response) {
    return {
        type: ActionsConstants.HANDLE_USER_EXISTS_RESPONSE,
        payload: {
            response: response
        }
    }
}

function handleUserDetailsResponse(response) {
    return {
        type: ActionsConstants.HANDLE_USER_DETAILS_RESPONSE,
        payload: {response: response}
    }
}

function updateProfileDetails(username, location) {
    return {
        type: ActionsConstants.UPDATE_PROFILE_DETAILS,
        payload: {
            username: username,
            location: location
        }
    }
}

function handleSearchUsersResponse(response) {
    return {
        type: ActionsConstants.HANDLE_SEARCH_USERS_RESPONSE,
        payload: {
            response: response
        }
    }
}

function handleSearchRestaurantsResponse(response) {
    return {
        type: ActionsConstants.HANDLE_SEARCH_RESTAURANTS_RESPONSE,
        payload: {
            response: response
        }
    }
}

function updateRestaurantsGrade(lat, lon, value, restaurants) {
    return {
        type: ActionsConstants.UPDATE_RESTAURANTS_GRADE,
        payload: {
            lat: lat,
            lon: lon,
            value: value,
            restaurants: restaurants
        }
    }
}

function handleGetRestaurantsResponse(response) {
    return {
        type: ActionsConstants.HANDLE_GET_RESTAURANTS_RESPONSE,
        payload: {response: response}
    }
}

function handleRestaurantDetailsResponse(response) {
    return {
        type: ActionsConstants.HANDLE_RESTAURANT_DETAILS_RESPONSE,
        payload: {response: response}
    }
}

function handleGetReviewResponse(response) {
    return {
        type: ActionsConstants.HANDLE_GET_REVIEW_RESPONSE,
        payload: {response: response}
    }
}

function updateReviewCriteria(criteria) {
    return {
        type: ActionsConstants.UPDATE_REVIEW_CRITERIA,
        payload: {criteria: criteria}
    }
}

function removeReviewFromProfile(reviews, id) {
    return {
        type: ActionsConstants.DELETE_REVIEW_FROM_PROFILE,
        payload: {
            reviews: reviews,
            id: id
        }
    }
}

// Saga
function signInRequest(user) {
    return {
        type: ActionsConstants.SIGN_IN_REQUEST,
        payload: {user: user}
    }
}

function signUpRequest(user) {
    return {
        type: ActionsConstants.SIGN_UP_REQUEST,
        payload: {user: user}
    }
}

function signOutRequest() {
    return {
        type: ActionsConstants.SIGN_OUT_REQUEST,
        payload: {}
    }
}

function userExistsRequest(username) {
    return {
        type: ActionsConstants.USER_EXISTS_REQUEST,
        payload: {username: username}
    }
}

function isLoggedInRequest() {
    return {
        type: ActionsConstants.IS_LOGGED_IN_REQUEST,
        payload: {}
    }
}

function userDetailsRequest(username) {
    return {
        type: ActionsConstants.USER_DETAILS_REQUEST,
        payload: {username: username}
    }
}

function updateProfileRequest(oldUsername, newUsername, newLocation) {
    return {
        type: ActionsConstants.UPDATE_PROFILE_REQUEST,
        payload: {
            oldUsername: oldUsername,
            newUsername: newUsername,
            newLocation: newLocation
        }
    }
}

function updateUserRequest(oldUsername, newUsername, newLocation) {
    return {
        type: ActionsConstants.UPDATE_USER_REQUEST,
        payload: {
            oldUsername: oldUsername,
            newUsername: newUsername,
            newLocation: newLocation
        }
    }
}

function searchUsersRequest(username, fullName, location) {
    return {
        type: ActionsConstants.SEARCH_USERS_REQUEST,
        payload: {
            username: username,
            fullName: fullName,
            location: location
        }
    }
}

function searchRestaurantsRequest(name, location, type, score) {
    return {
        type: ActionsConstants.SEARCH_RESTAURANTS_REQUEST,
        payload: {
            name: name,
            location: location,
            type: type,
            score: score
        }
    }
}

function getRestaurantsRequest() {
    return {
        type: ActionsConstants.GET_RESTAURANTS_REQUEST,
        payload: {}
    }
}

function restaurantDetailsRequest(name) {
    return {
        type: ActionsConstants.RESTAURANT_DETAILS_REQUEST,
        payload: {
            name: name
        }
    }
}

function addReviewRequest(review) {
    return {
        type: ActionsConstants.ADD_REVIEW_REQUEST,
        payload: {review: review}
    }
}

function editReviewRequest(review) {
    return {
        type: ActionsConstants.EDIT_REVIEW_REQUEST,
        payload: {review: review}
    }
}

function getReviewRequest(id) {
    return {
        type: ActionsConstants.GET_REVIEW_REQUEST,
        payload: {id: id}
    }
}

function deleteReviewRequest(id, restaurant, reviews) {
    return {
        type: ActionsConstants.DELETE_REVIEW,
        payload: {
            id: id,
            restaurant: restaurant,
            reviews: reviews
        }
    }
}

export let StoreActions = {
    setUsername: setUsername,
    signOutStore: signOutStore,
    handleSignInResponse: handleSignInResponse,
    handleUserExistsResponse: handleUserExistsResponse,
    handleUserDetailsResponse: handleUserDetailsResponse,
    updateProfileDetails: updateProfileDetails,
    handleSearchUsersResponse: handleSearchUsersResponse,
    handleSearchRestaurantsResponse: handleSearchRestaurantsResponse,
    updateRestaurantsGrade: updateRestaurantsGrade,
    handleGetRestaurantsResponse: handleGetRestaurantsResponse,
    handleRestaurantDetailsResponse: handleRestaurantDetailsResponse,
    handleGetReviewResponse: handleGetReviewResponse,
    updateReviewCriteria: updateReviewCriteria,
    removeReviewFromProfile: removeReviewFromProfile
};

export let APIActions = {
    signInRequest: signInRequest,
    signOutRequest: signOutRequest,
    signUpRequest: signUpRequest,
    userExistsRequest: userExistsRequest,
    isLoggedInRequest: isLoggedInRequest,
    userDetailsRequest: userDetailsRequest,
    updateProfileRequest: updateProfileRequest,
    updateUserRequest: updateUserRequest,
    searchUsersRequest: searchUsersRequest,
    searchRestaurantsRequest: searchRestaurantsRequest,
    getRestaurantsRequest: getRestaurantsRequest,
    restaurantDetailsRequest: restaurantDetailsRequest,
    addReviewRequest: addReviewRequest,
    editReviewRequest: editReviewRequest,
    getReviewRequest: getReviewRequest,
    deleteReviewRequest: deleteReviewRequest
};
