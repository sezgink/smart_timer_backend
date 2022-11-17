const http = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const MongoManager = require('./mongodb.js');
const dbManager = MongoManager();

const cors = require('cors');

const LoginManager = require('./login')();

const router = express.Router();
const app = express();

const jwt = require('jsonwebtoken');

const hostname = '127.0.0.1';
const port = 9443;

app.use(cors({origin:true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/",router);

router.get('/', (req, res) => {
  res.send('Smart Timer API')
});

router.post('/login',(req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  LoginManager.login({"username":username,"password":password},dbManager).then((loginResult)=>{
    console.log("Login Result");
    res.status(200);
    if(loginResult.success==true){
      const _token = jwt.sign({id:loginResult.id},"untillovemesometimewreckdsa");
      res.end(JSON.stringify({success:true,token:_token}));
      // res.end(JSON.stringify({message:"Nice"}));
    }else{
      res.end(JSON.stringify({success:false}));
    }
    
  }).catch((err)=>{
    console.log(err);
    res.status(502);
    res.end(JSON.stringify({success:false}));
  });
});

router.post('/signup',(req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  LoginManager.signUp({"username":username,"password":password},dbManager).then((signupResult)=>{
    console.log("Signup Result");
    res.status(200);
    res.end(JSON.stringify({message:"Nice"}));
  }).catch((err)=>{
    console.log(err);
    res.status(502);
    res.end(JSON.stringify({message:"Error"}));
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

