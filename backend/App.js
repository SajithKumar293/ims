const express = require('express');
const app = express();
require('dotenv').config({
  path: './config/config.env'
});

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
  next();
})

const {acquireSignin,userCheck} = require('./Controllers/auth.controller');
const routingCenter =require('./routes/routingCenter');

const port = process.env.PORT || 5000;
const log =console.log;

app.use(express.json());

log("At gateway");
const authRouter = require('./routes/auth.route');

// Use Routes
app.use('/api', authRouter,routingCenter);
app.use('/api',acquireSignin,userCheck,routingCenter);

app.use((req, res) => {
  res.status(404).json({
      success: false,
      msg: "Page not found"
  });
});

let server=app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
