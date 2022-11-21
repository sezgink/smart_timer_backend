const { response } = require('express');
const express = require('express');
const auth = require('../middleware/auth');
const Interval = require('../models/intervals');

const router = express.Router();

router.get('/intervals/:id', auth, async (req,res)=>{
    try{
    const interval = await Interval.findOne({_id:req.params.id, owner : req.user});

    if (!interval) {
        return res.status(404).send();
    }

    response.send(interval);
    } catch(e){
        res.status(500).send();
    }
});

router.post('/intervals/add', auth, async (req,res)=>{
    try{
    const interval = new Interval({intervalLength:req.body.intervalLength, task:req.body.task,owner:req.user._id});

    await interval.save();

    response.send(interval);
    } catch(e){
        res.status(500).send();
    }
});

router.post('/intervals/addMultiple', auth, async (req,res)=>{
    try{
    const interval = await Interval.findOne({_id:req.params.id, owner : req.user});

    if (!interval) {
        return res.status(404).send();
    }

    response.send(interval);
    } catch(e){
        res.status(500).send();
    }
});

module.exports = router;