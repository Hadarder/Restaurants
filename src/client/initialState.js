const {Map, List} = require('immutable');

export default {
    session: Map({
        username: "",
        loggedIn: false,
        validSignIn: true,
        usernameExists: false,
    }),
    profile: Map({
        editable: false,
        username: "",
        fullName: "",
        location: "",
        picture: "",
        reviews: List()
    }),
    search: Map({
        users: List(),
        restaurants: List(),
        restaurantsNames: List(),
    }),
    restaurant: Map({
        name: "",
        type: "",
        location: "",
        score: 1,
        picture: "",
        reviews: List()
    }),
    review: Map({
        restaurant: "",
        bathroom: 0,
        staff: 0,
        clean: 0,
        drive: 0,
        delivery: 0,
        food: 0,
        // pictures: List()
    })
};
