const { response } = require('express');
const express = require('express');
const auth = require('../middleware/auth');
const Interval = require('../models/intervals');

const router = express.Router();

router.get('/intervals/findById:id', auth, async (req,res)=>{
    console.log("Lets go");
    try{
    const interval = await Interval.findOne({_id:req.params.id, owner : req.user._id});
    console.log("Lets go2");
    if (!interval) {
        return res.status(404).send();
    }

    res.send(interval);
    } catch(e){
        res.status(500).send();
    }
});

// router.get('/intervals/getBetween/:beginDate/:endDate', auth, async (req,res)=>{
router.get('/intervals/getBetween/', auth, async (req,res)=>{
    console.log("Lets go Interval1");
    try{
        const intervalsBetween = await Interval.find({owner : req.user, createdAt: { $gte: new Date("2022-11-23T21:50:40.294Z"), $lte : new Date("2022-11-23T21:53:40.294Z") }});
        // const intervalsBetween = await Interval.find({owner : req.user, createdAt: { $gte: new Date(2014, 4, 24)}});
        
        // const intervalsBetween = await Interval.find({owner : req.user._id});
        console.log(intervalsBetween);

        if (!intervalsBetween) {
            return res.status(404).send();
        }

        console.log("Lets go Interval3");

        res.send({intervalsBetween});
    } catch(e){
        console.log("err");
        res.status(500).send(e);
    }
});

router.post('/intervals/add', auth, async (req,res)=>{
    try{
        const interval = new Interval({intervalLength:req.body.intervalLength, task:req.body.task,owner:req.user._id});
        await interval.save();

        res.status(201).send(interval);
    } catch(e){
        res.status(500).send();
    }
});

router.post('/intervals/addMultiple', auth, async (req,res)=>{
    try{
        const result = await Interval.insertMany(req.body.intervals);
    
        res.status(201).send({result});
        } catch(e){
            res.status(500).send();
        }
});

module.exports = router;