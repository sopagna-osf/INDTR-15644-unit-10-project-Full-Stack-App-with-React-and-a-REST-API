import React, { Component } from 'react';
import api from '../../api';
import AppContext from '../../contexts/AppContext';

import CourseForm from '../course/CourseForm';

class UpdateCourse extends Component {
  constructor() {
    super();

    this.state = {
      course: {},
      errors: []
    };
  }

  componentWillMount() {
    const { match } = this.props;

    api.get('/courses/' + match.params.id)
    .then(response => {
      const course = response.data;

      if (!course.user || this.context.data.user._id !== course.user._id) {
        return this.props.history.push('/forbidden');
      }

      this.setState({ course });
    })
    .catch(err => {
      const status = err.response.status;

      if (status === 404) {
        this.props.history.push('/notfound');
      }
    });
  }

  handleSubmit = (data) => {
    const { match } = this.props;
    data = data || {};
    data.user = this.context.data.user._id;

    api.put('/courses/' + match.params.id, data)
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
        <h1>Update Course</h1>
        <CourseForm
          onSubmit={ this.handleSubmit }
          onCancel={ this.handleCancel }
          errors={ this.state.errors }
          course={ this.state.course }
        />
      </div>
    );
  }
}

UpdateCourse.contextType = AppContext;

export default UpdateCourse;
