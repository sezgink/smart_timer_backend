const http = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const MongoManager = require('./mongodb.js');
const dbManager = MongoManager();

const cors = require('cors');

const LoginManager = require('./login')();

const router = express.Router();
const app = express();

const hostname = '127.0.0.1';
const port = 9443;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

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
  console.log("User name = "+username+", password is "+password);
  LoginManager.login({"username":username,"password":password},dbManager).then((loginResult)=>{
    console.log("Login Result");
    res.status(200);
    res.end(JSON.stringify({message:"Nice"}));
  }).catch((err)=>{
    console.log(err);
    res.status(502);
    res.end(JSON.stringify({message:"Error"}));
  });
});

router.post('/signup',(req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  console.log("User name = "+username+", password is "+password);
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

// dbManager.CreateInterval({interval:10,mission:"Timer Backend"});
// setTimeout(()=>dbManager.CreateInterval({interval:10,mission:"Timer Backend"}),3000);
// setTimeout(()=>dbManager.GetIntervals(100),3000);
setTimeout(()=>{
  // dbManager.CreateInterval({interval:10,mission:"Timer Backend"});
  // dbManager.GetIntervals(3000);

  // dbManager.AddUser({username:"Hello",hashedPassword:"bro"});
  // dbManager.CheckUser({username:"Mellon",hashedPassword:"bro"});

  // LoginManager.login({username:"Jelly",password:"bro"},dbManager);
  // LoginManager.login({username:"Potatos",password:"drone"},dbManager);
  // LoginManager.signUp({username:"Potatos",password:"drone"},dbManager);

},3000);
// dbManager.GetIntervals(100);

