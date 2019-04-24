'use strict';

const express = require('express');
const auth = require('../middlewares/authentication');
const Course = require('../models/Course');

const router = express.Router();

// Middleware
const checkCourseOwnership = (req, res, next) => {
  if (req.user.id !== req.course.user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    return next(err);
  }

  next();
};

router.param('id', (req, res, next, id) => {
  Course.findById(id)
    .populateUser()
    .exec((err, course) => {
      if (err) {
        return next(err);
      }

      if (!course) {
        err = new Error('Not found');
        err.status = 404;
        return next(err);
      }

      req.course = course;
      next();
    });
});

// Get course collections
router.get('/', (req, res, next) => {
  Course.find({})
    .populateUser()
    .exec((err, courses) => {
      if (err) {
        return next(err);
      }

      res.json(courses);
    });
});

// Get course with specified id
router.get('/:id', (req, res, next) => {
  res.json(req.course);
});

// Create new course
router.post('/', auth, (req, res, next) => {
  Course.create(req.body)
  .then(course => {
    res.location(`/courses/${course._id}`);
    res.status(201);
    res.end();
  })
  .catch(next);
});

// Update course
router.put('/:id', auth, checkCourseOwnership, (req, res, next) => {
  req.course.updateOne(req.body, { runValidators: true })
  .then(result => {
    res.status(204);
    res.end();
  })
  .catch(next);
});

// Delete course
router.delete('/:id', auth, checkCourseOwnership, (req, res, next) => {
  req.course.delete()
  .then(result => {
    res.status(204);
    res.end();
  })
  .catch(next);
});

module.exports = router;
