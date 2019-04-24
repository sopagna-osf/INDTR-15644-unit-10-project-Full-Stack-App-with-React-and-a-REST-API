'use strict';

const express = require('express');
const auth = require('../middlewares/authentication');
const User = require('../models/User');

const router = express.Router();

// Get current authenticated user
router.get('/', auth, (req, res) => {
  res.json(req.user);
});

// Create new user
router.post('/', (req, res, next) => {  
  User.create(req.body)
  .then(user => {
    res.location('/');
    res.status(201);
    res.end();
  })
  .catch(next);
});

module.exports = router;
