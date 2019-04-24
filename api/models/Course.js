'use strict';

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  estimatedTime: String,
  materialsNeeded: String
});

CourseSchema.query.populateUser = function() {
  return this.populate('user', 'firstName lastName');
};

module.exports = mongoose.model('Course', CourseSchema);
