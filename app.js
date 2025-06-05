var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {connectDatabase} = require('./Connect');
var app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your React app's URL 
methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));

connectDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
