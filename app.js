const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const OrderRoutes = require('./api/routes/orders');

mongoose.connect(
  'mongodb+srv://Sureshgowda:+ process.env.MONGO_ATLAS_PW + @ cluster0.rqxeb74.mongodb.net/?retryWrites=true&w=majority',
{
  useMongoClient: true 
}
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Heades", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

app.use('/product', productRoutes);
app.use('/orders', OrderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message:error.message
    }
  });
});

module.exports = app;