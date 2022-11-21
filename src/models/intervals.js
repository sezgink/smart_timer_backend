const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {default :validator} = require('validator');

const intervalSchema = new Schema({
    intervalLength  : {
        type : Number,
        required: true
    },
    task : {
        type : String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Interval = new mongoose.model('Interval',intervalSchema);

module.exports = Interval;