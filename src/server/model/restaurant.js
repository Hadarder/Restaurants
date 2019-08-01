let mongoose = require('mongoose');
const LocationSchema = require('./location.js');

const RestaurantSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    location: {type: LocationSchema, required: true},
    type: {type: String, required: true},
    score: {type: Number, required: true},
    picture: {type: String, required: true}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
