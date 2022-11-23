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
}, 
{ //Settings
    timestamps : {
        createdAt : true,
        updatedAt : false
    }
}
);

const Interval = mongoose.model('Interval',intervalSchema);

module.exports = Interval;