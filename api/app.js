'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// CORS
app.use(cors());

// Database connection
database.on('error', (err) => {
  console.log('connection error: ', err);
});

database.once('open', () => {
  console.log('database connection successful');
});

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
app.use('/api/users', userRoute);
app.use('/api/courses', courseRoute);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  let errStatus = err.status;
  if (!errStatus && err.name === 'ValidationError') {
    errStatus = 400;
  }

  res.status(errStatus || 500).json({
    message: err.message,
    error: err.errors || {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
