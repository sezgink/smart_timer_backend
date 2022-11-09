const http = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const MongoManager = require('./mongodb.js');

const dbManager = MongoManager();

const router = express.Router();
const app = express();

const hostname = '127.0.0.1';
const port = 9443;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });



app.use("/",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send('Smart Timer API')
});

router.post('/login',(req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("Yes");
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// dbManager.CreateInterval({interval:10,mission:"Timer Backend"});
// setTimeout(()=>dbManager.CreateInterval({interval:10,mission:"Timer Backend"}),3000);
// setTimeout(()=>dbManager.GetIntervals(100),3000);
setTimeout(()=>{
  dbManager.CreateInterval({interval:10,mission:"Timer Backend"});
  dbManager.GetIntervals(3000);

},3000);
// dbManager.GetIntervals(100);

