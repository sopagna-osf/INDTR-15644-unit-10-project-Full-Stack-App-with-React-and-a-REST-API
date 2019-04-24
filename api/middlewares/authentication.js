'use strict';

const auth = require('basic-auth');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const credentials = auth(req);
  let err;

  if (!credentials) {
    err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }

  User.findOne({emailAddress: credentials.name})
  .then(user => {
    if (user && user.comparePassword(credentials.pass)) {
      req.user = user;
      next();
    } else {
      err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }
  })
  .catch(next);
}
