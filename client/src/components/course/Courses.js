import React, { Component } from 'react';
import api from '../../api';

import Course from './Course';
import AddNewCourse from './AddNewCourse';

class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    api.get('/courses')
    .then(response => {
      this.setState({ courses: response.data });
    })
    .catch(err => {
      this.setState({ courses: [] });
    });
  }

  render() {
    const courses = this.state.courses.map((course) => <Course course={ course } key={ course._id } />);

    return (
      <div className="bounds">
        { courses }
        <AddNewCourse />
      </div>
    );
  }
}

export default Courses;
