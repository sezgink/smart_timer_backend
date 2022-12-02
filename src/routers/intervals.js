const { response } = require('express');
const express = require('express');
const auth = require('../middleware/auth');
const Interval = require('../models/intervals');

const router = express.Router();

router.get('/intervals/findById:id', auth, async (req,res)=>{
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

router.get('/intervals/getBetween', auth, async (req,res)=>{
// router.get('/intervals/getBetween/', auth, async (req,res)=>{
    try{
        
        var daysBetween = (new Date(req.query.endDate).getTime() - new Date(req.query.beginDate).getTime())/86400000;
        if(daysBetween>7){
            return res.status(404).send({"error":"Max day range is 7 days"});
        }

        // const intervalsBetween = await Interval.find({owner : req.user, createdAt: { $gte: new Date("2022-11-23T21:50:40.294Z"), $lte : new Date("2022-11-23T21:53:40.294Z") }});
        const intervalsBetween = await Interval.find({owner : req.user, createdAt: { $gte: new Date(req.query.beginDate), $lte : new Date(req.query.endDate)}});
        // console.log(intervalsBetween);

        if (!intervalsBetween) {
            return res.status(404).send({"error":"No inervals"});
        }

        res.status(200).send({intervalsBetween});
    } catch(e){
        console.log("err"+e);
        res.status(500).send(e);
    }
});

router.get('/intervals/getDailyWorkBetween', auth, async (req,res)=>{
    // router.get('/intervals/getBetween/', auth, async (req,res)=>{
        try{
            const beginDate = new Date(req.query.beginDate);
            let endDate = new Date(req.query.endDate);
            var daysBetween = (endDate.getTime() - beginDate.getTime())/86400000;
            // console.log(daysBetween);
            if(daysBetween>7){
                return res.status(404).send({"error":"Max day range is 7 days"});
            }
    
            // const intervalsBetween = await Interval.find({owner : req.user, createdAt: { $gte: beginDate, $lte : endDate}});
            
            // const intervalsBetween = await Interval.GetDailyWorks(beginDate,endDate,req.user);

            // console.log(beginDate);           
            // console.log(endDate);
            // console.log("-");

            const intervalsBetween = await Interval.GetDailyWorksWithTasks(beginDate,endDate,req.user);
    
            if (!intervalsBetween) {
                return res.status(404).send({"error":"No inervals"});
            }
    
            res.send({intervalsBetween});
        } catch(e){
            console.log("err"+e);
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