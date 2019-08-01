const Review = require('../model/review.js');
const Restaurant = require('../model/restaurant.js');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = (app) => {
    app.post('/api/addReview', function (req, res) {
        const {username, restaurant, date, criteria, pictures} = req.body;
        let count = 0, sum = 0;
        criteria.map(cri => {
            if (cri) {
                count++;
                sum += cri;
            }
        });
        let score = sum / count;
        const review = new Review({
            username,
            restaurant,
            date,
            bathroom: criteria[0],
            staff: criteria[1],
            clean: criteria[2],
            drive: criteria[3],
            delivery: criteria[4],
            food: criteria[5],
            score,
            pictures
        });
        review.save(function (err) {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .send("Error adding review. please try again");
                } else {
                    res.sendStatus(200);
                    updateRestaurantStore(restaurant);
                }
            }
        );
    });

    app.get('/api/getReview/:id', function (req, res) {
        const id = req.params.id;
        Review.findOne({_id: new ObjectId(id)}, function (err, review) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else if (!review) {
                res.status(404);
            } else {
                res.status(200).json({
                    restaurant: review.restaurant,
                    bathroom: review.bathroom,
                    staff: review.staff,
                    clean: review.clean,
                    drive: review.drive,
                    delivery: review.delivery,
                    food: review.food,
                    // pictures: review.pictures
                })
            }
        });
    });

    app.post('/api/editReview', function (req, res) {
        const {id, restaurant, date, criteria
            // ,pictures
        } = req.body;
        let count = 0, sum = 0;
        criteria.map(cri => {
            if (cri) {
                count++;
                sum += cri;
            }
        });
        let score = sum / count;
        Review.findOneAndUpdate({_id: new ObjectId(id)},
            {
                $set: {
                    date: date,
                    bathroom: criteria[0],
                    staff: criteria[1],
                    clean: criteria[2],
                    drive: criteria[3],
                    delivery: criteria[4],
                    food: criteria[5],
                    score: score,
                    // pictures: pictures
                }
            }, function (err, doc) {
                if (err)
                    console.error(err);
                else {
                    res.sendStatus(200);
                    updateRestaurantStore(restaurant);
                }
            });
    });

    app.post('/api/deleteReview', function (req, res) {
        const {id, restaurant} = req.body;
        Review.findOneAndRemove({_id: new ObjectId(id)}, function (err, doc) {
            if (err)
                console.error(err);
            else {
                res.sendStatus(200);
                updateRestaurantStore(restaurant);
            }
        });
    });
};

function updateRestaurantStore(restaurant) {
    Review.find(
        {
            'restaurant': {'$regex': '^' + restaurant + '$', $options: 'i'}
        }, function (err, doc) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else {
                let sum = 0, count = 0;
                doc.map(review => {
                    count++;
                    sum += review.score;
                });
                let score = parseFloat((count ? sum / count : 0).toFixed(2));
                Restaurant.findOneAndUpdate({
                        'name': {'$regex': '^' + restaurant + '$', $options: 'i'}
                    },
                    {
                        $set: {
                            score: score
                        }
                    }, function (err, doc) {
                        if (err)
                            console.error(err);
                    }
                )
                ;
            }
        });
}