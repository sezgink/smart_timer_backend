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

module.exports = router;