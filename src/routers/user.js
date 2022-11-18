
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

router.post('/login',async (req, res) => {
    var username = req.body.email;
    var password = req.body.password;
    try{
      let loginResult = await User.findCheck(username,password);
  
      const _token = jwt.sign({id:loginResult.id},"untillovemesometimewreckdsa");
      res.status(200).end(JSON.stringify({user:loginResult,token:_token}));
  
    } catch(err){
      console.log(err);
      res.status(400);
      res.end(JSON.stringify({error:err}));
    }
  });
  
  router.post('/signup',async (req, res) => {
    try{
      var username = req.body.email;
      var password = req.body.password;
    
      const newUser = new User({
        email:username,
        password
      });
      await newUser.save();
      res.status(200).end(JSON.stringify(newUser));
  
    } catch(err){
      res.status(400).end(JSON.stringify({Error:err}));
      console.log(err);
    }
  });
  
  module.exports = router;