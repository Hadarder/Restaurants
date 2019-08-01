let mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    city: {type: String, required: true},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
});

module.exports = LocationSchema;
