import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Course = (props) => (
  <div className="grid-33">
    <Link className="course--module course--link" to={ `/courses/${ props.course._id }` }>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{ props.course.title }</h3>
    </Link>
  </div>
);

Course.propTypes = {
  course: PropTypes.object.isRequired
};

export default Course;
