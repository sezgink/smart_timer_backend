
const User = require('../models/user');
const express = require('express');

const router = express.Router();

router.post('/login',async (req, res) => {
    try{
      const username = req.body.email;
      const password = req.body.password;

      const loginResult = await User.findByCredidentals(username,password);
      const token = await loginResult.CreateAuthToken();
      res.status(200).end(JSON.stringify({user:loginResult,token}));
  
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