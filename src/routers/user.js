
const User = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/user/login',async (req, res) => {
    try{
      const username = req.body.email;
      const password = req.body.password;

      const loginResult = await User.findByCredidentals(username,password);
      const token = await loginResult.CreateAuthToken();
      res.status(200).send(JSON.stringify({user:loginResult,token}));
  
    } catch(err){
      console.log(err);
      res.status(400);
      res.send(JSON.stringify({error:err}));
    }
  });
  
  router.post('/user/signup',async (req, res) => {
    try{
      var username = req.body.email;
      var password = req.body.password;
    
      const newUser = new User({
        email:username,
        password
      });
      await newUser.save();
      res.status(200).send(JSON.stringify(newUser));
  
    } catch(err){
      res.status(400).send(JSON.stringify({Error:err}));
      console.log(err);
    }
  });

  router.post('/user/logout',auth,async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token;
      })
      await req.user.save();

      res.send();
    } catch (e) {
        res.status(500).send();
    }
  });

  router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
  });
  
  router.get('/user/me', auth, async (req, res) => {
    res.send(req.user);
  });

  router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
  })

  router.delete('/user/me', auth, async (req, res) => {
      try {
          await req.user.remove();
          res.send(req.user);
      } catch (e) {
          res.status(500).send();
      }
  })




  
  module.exports = router;