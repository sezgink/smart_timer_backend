const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/tasks');

const router = express.Router();

router.post('/tasks/', auth, async (req,res)=>{
    try{
        const task = new Task({name:req.body.name,owner:req.user._id});
        await task.save();

        res.status(201).send(task);
    } catch(e){
        res.status(500).send();
    }
});

router.get('/tasks/',auth, async (req,res)=>{
    try{
        const tasks = await Task.findTasksByUser(req.user._id);
        if (!tasks) {
            res.status(404).send()
        }

        res.status(200).send(tasks);
    } catch(e){
        res.status(500).send();
    }
});

router.get('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;