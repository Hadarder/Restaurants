const User = require('../model/user.js');
const Review = require('../model/review.js');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware');
const secret = middleware.secret;
const withAuth = middleware.withAuth;
const compareUsername = middleware.compareUsername;

module.exports = (app) => {
    app.post('/api/signUp', function (req, res) {
        const {username, password, fullName, picture, location} = req.body;
        const user = new User({username, password, fullName, picture, location});
        user.save(function (err) {
            if (err) {
                console.error(err);
                res.status(500)
                    .send("Error registering new user. please try again");
            } else {
                // Issue token
                const payload = {username};
                const token = jwt.sign(payload, secret, {});
                res.cookie('token', token, {httpOnly: true})
                    .sendStatus(200);
            }
        });
    });

    app.post('/api/signIn', function (req, res) {
        const {username, password} = req.body;
        User.findOne({'username': {'$regex': '^' + username + '$', $options: 'i'}}, function (err, user) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect email or password'
                    });
            } else {
                user.isCorrectPassword(password, function (err, same) {
                    if (err) {
                        res.status(500)
                            .json({
                                error: 'Internal error please try again'
                            });
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password'
                            });
                    } else {
                        // Issue token
                        const payload = {username};
                        const token = jwt.sign(payload, secret, {});
                        res.cookie('token', token, {httpOnly: true})
                            .sendStatus(200);
                    }
                });
            }
        });
    });

    app.get('/api/userExists/:username', function (req, res) {
        const username = req.params.username;
        User.findOne({'username': {'$regex': '^' + username + '$', $options: 'i'}}, function (err, user) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else if (!user) {
                res.sendStatus(204);
            } else {
                res.sendStatus(200);
            }
        });
    });

    app.get('/api/getUserDetails/:username', compareUsername, function (req, res) {
        const editable = req.editable;
        const username = req.params.username;

        User.findOne({'username': {'$regex': '^' + username + '$', $options: 'i'}}, function (err, user) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error: please try again'
                    });
            } else if (!user) {
                res.status(404);
            } else {
                Review.find({'username': {'$regex': '^' + username + '$', $options: 'i'}}, function (err, reviews) {
                    res.status(200).json({
                        editable: editable,
                        user: {
                            username: user.username,
                            fullName: user.fullName,
                            location: user.location.city,
                            picture: user.picture
                        },
                        reviews: reviews
                    })
                });
            }
        });
    });

    app.get('/api/isLoggedIn', withAuth, function (req, res) {
        res.status(200)
            .json({
                username: req.username
            })
    });

    app.get('/api/signOut', function (req, res) {
        res.clearCookie('token');
        res.sendStatus(200);
    });

app.post('/api/updateUser/:username', function (req, res) {
        const username = req.params.username;
        const {newUsername, newLocation} = req.body;
        User.findOneAndUpdate({'username': {'$regex': '^' + username + '$', $options: 'i'}},
            {
                $set: {
                    username: newUsername,
                    location: newLocation
                }
            }, function (err, doc) {
                if (err)
                    console.error(err);
                else {
                    Review.updateMany({'username': {'$regex': '^' + username + '$', $options: 'i'}},
                        {
                            $set: {
                                username: newUsername
                            }
                        }, function (err, doc) {
                            if (err)
                                console.error(err);
                            else {
                                const payload = {username: newUsername};
                                const token = jwt.sign(payload, secret, {});
                                res.cookie('token', token, {httpOnly: true})
                                    .sendStatus(200);
                            }
                        });
                }
            });

    
    app.get('/api/searchUsers', function (req, res) {
        const {username, fullName, location} = req.query;
        User.find(
            {
                username: {"$regex": username, "$options": "i"},
                fullName: {"$regex": fullName, "$options": "i"},
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
                    const results = doc.map(user => ({
                        image: user.picture,
                        title: user.username,
                        description1: user.fullName,
                        description2: user.location.city
                    }));
                    res.status(200).json(results);
                }
            }
        )
    });
};
