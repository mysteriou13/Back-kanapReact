var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv');
var helmet = require("helmet");

dotenv.config();
var usersRouter = require('./routes/users');
var  productuser = require('./routes/Product')
const {connectDatabase} = require('./Connect');
var app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));



connectDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ...existing code...
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'"],
      },
    },
  }),
);
app.use('/users', usersRouter);
app.use('/product', productuser)

module.exports = app;
