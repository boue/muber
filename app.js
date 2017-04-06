const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/muber');
}
//MIDDLEWARES
app.use(bodyParser.json());
//setup all the routes in application, routes are kind of like middleware
routes(app);

//.use is to build middleware. We are expecting the handler before to throw an error so we need 
// err object, next is a function to go to next middleware in the chain
app.use(() => {
  console.log(err);
});

module.exports = app;