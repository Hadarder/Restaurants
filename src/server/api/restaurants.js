const Restaurant = require('../model/restaurant.js');
const Review = require('../model/review.js');
const restaurantsList = require('../restaurantsList');

Restaurant.collection.countDocuments({}, function (err, count) {
    if (err) {
        console.log("Error in count");
    } else {
        if (count === 0) {
            restaurantsList.map(rest => {
                const {name, location, type, score, picture} = rest;
                const restaurant = new Restaurant({name, location, type, score, picture});
                restaurant.save(rest, (function (err) {
                    if (err) {
                        console.error(err);
                    }
                }))
            })
        }
    }
});

module.exports = (app) => {
    app.post('/api/addRestaurant', function (req, res) {
        const arr = req.body;
        arr.map(elem => {
            const {name, location, type, score, picture} = elem;
            const restaurant = new Restaurant({name, location, type, score, picture});
            restaurant.save(function (err) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .send("Error adding restaurant. please try again");
                } else {
                    res.sendStatus(200);
                }
            });
        });
    });

    app.get('/api/searchRestaurants', function (req, res) {
        const {name, location, type, score} = req.query;
        Restaurant.find(
            {
                name: {"$regex": name, "$options": "i"},
                type: {"$regex": type, "$options": "i"},
                'location.city': {"$regex": location, "$options": "i"},
            },
            function (err, doc) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({
                            error: 'Internal error: please try again'
                        });
                } else {
                    const results = doc
                        .filter(res => res.score >= score)
                        .map(res => ({
                            image: res.picture,
                            title: res.name,
                            description1: res.score,
                            description2: res.location.city,
                            lat: res.location.lat,
                            lon: res.location.lon,
                            grade: res.score
                        }));
                    res.status(200).json(results);
                }
            }
        )
    });

    app.get('/api/getRestaurants', function (req, res) {
        Restaurant.find({},
            function (err, doc) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({
                            error: 'Internal error: please try again'
                        });
                } else {
                    let results = doc.map(res => ({
                        value: res.name,
                        label: res.name
                    }));
                    results.push({value: "", label: ""});
                    res.status(200).json(results);
                }
            }
        )
    });

    app.get('/api/getRestaurantDetails/:name', function (req, res) { //TODO: add reviews to response
        const name = req.params.name;

        Restaurant.findOne({'name': {'$regex': '^' + name + '$', $options: 'i'}}, function (err, rest) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else if (!rest) {
                res.status(404);
            } else {
                Review.find({'restaurant': {'$regex': '^' + name + '$', $options: 'i'}}, function (err, reviews) {
                    res.status(200).json({
                        name: rest.name,
                        type: rest.type,
                        location: rest.location.city,
                        score: rest.score,
                        picture: rest.picture,
                        reviews: reviews
                    });
                });
            }
        });
    });
};