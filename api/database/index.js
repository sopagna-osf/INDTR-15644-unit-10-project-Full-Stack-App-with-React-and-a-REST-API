'use strict';

const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

module.exports = mongoose.connection;
