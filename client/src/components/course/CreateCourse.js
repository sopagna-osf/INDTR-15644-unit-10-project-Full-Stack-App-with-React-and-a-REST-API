import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import api from '../../api';

import CourseForm from '../course/CourseForm';

class CreateCourse extends Component {
  constructor() {
    super();

    this.state = {
      errors: []
    };
  }

  handleSubmit = (data) => {
    data = data || {};
    data.user = this.context.data.user._id; 

    api.post('/courses', data)
    .then(response => {
      this.props.history.push('/');
    })
    .catch(err => {
      if (err.response.status === 500) {
        this.props.history.push('/error');
      } else {
        this.setState({ errors: err.response.data.error });
      }
    });
  }

  handleCancel = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <CourseForm
          onSubmit={ this.handleSubmit }
          onCancel={ this.handleCancel }
          errors={ this.state.errors }
        />
      </div>
    );
  }
}

CreateCourse.contextType = AppContext;

export default CreateCourse;
