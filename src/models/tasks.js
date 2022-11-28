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

taskSchema.statics.findTasksByUser = async (userId)=>{
    const tasksOfUser = await Task.find({owner:userId});
    return tasksOfUser;
}

const Task = new mongoose.model('Task',taskSchema);

module.exports = Task;