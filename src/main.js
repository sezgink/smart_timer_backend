const express = require('express');
require('dotenv').config();
require('../src/mongoose');

const userRouter = require('./routers/user');
const intervalsRouter = require('./routers/intervals');
const tasksRouter = require('./routers/tasks')

const cors = require('cors');

const app = express();

const hostname = '127.0.0.1';
// const port = 9443;
const port = process.env.PORT || 9443;

app.use(cors({origin:true}));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));


app.use("/",userRouter);
app.use("/",intervalsRouter);
app.use("/",tasksRouter);

app.get('/', (req, res) => {
  res.send('Smart Timer API')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

