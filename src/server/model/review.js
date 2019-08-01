let mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    username: {type: String, required: true},
    restaurant: {type: String, required: true},
    date: {type: Number, required: true},
    bathroom: {type: Number, require: true},
    staff: {type: Number, require: true},
    clean: {type: Number, require: true},
    drive: {type: Number},
    delivery: {type: Number},
    food: {type: Number, require: true},
    score: {type: Number, required: true},
    pictures: {type: [String]}
});
module.exports = mongoose.model('Review', ReviewSchema);
