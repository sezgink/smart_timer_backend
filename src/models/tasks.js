const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {default :validator} = require('validator');

const taskSchema = new Schema({
    name : {
        type : String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Task = new mongoose.model('Task',intervalSchema);

module.exports = Task;