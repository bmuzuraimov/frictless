// Import required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('module-alias/register');
var logger = require('morgan');

require('dotenv').config();

// Import routes
var indexRouter = require('@routes/index');
var usersRouter = require('@routes/userRoutes');
var authRouter = require('@routes/authRoutes');
var notionRouter = require('@routes/notionRoutes');

// Initialize Express app
var app = express();

// JSON formatting setup for better readability in responses
app.set('json spaces', 2);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/notion', notionRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error response
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status
    }
  });
});

module.exports = app;