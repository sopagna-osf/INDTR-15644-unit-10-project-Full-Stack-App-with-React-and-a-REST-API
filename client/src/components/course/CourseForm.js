import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../contexts/AppContext';

import ValidationError from '../error/ValidationError';

class CourseForm extends Component {
  constructor() {
    super();

    this.state = {
      course: {
        title: null,
        description: null,
        estimatedTime: null,
        materialsNeeded: null
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course) {
      const { title, description, estimatedTime, materialsNeeded } = nextProps.course;
      this.setState({ course: { ...this.state.course, title, description, estimatedTime, materialsNeeded } });
    }
  }

  handleChange = (e) => {
    this.setState({ course: {...this.state.course, [e.target.name]: e.target.value} });
  }

  render() {
    const { course } = this.state;

    return (
      <Consumer>
        {
          context => (
            <div>
              <ValidationError errors={this.props.errors} />
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={ this.handleChange } defaultValue={ course.title } />
                    </div>
                    <p>By { context.data.user.firstName + ' ' + context.data.user.lastName }</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" placeholder="Course description..." onChange={ this.handleChange } value={ course.description || '' }></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={ this.handleChange } defaultValue={ course.estimatedTime } />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange={ this.handleChange } value={ course.materialsNeeded || '' }></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit" onClick={ (e) => { e.preventDefault(); this.props.onSubmit(course); } }>{ this.props.course ? 'Update Course' : 'Create Course' }</button>
                  <button className="button button-secondary" type="button" onClick={ this.props.onCancel }>Cancel</button>
                </div>
              </form>
            </div>
          )
        }
      </Consumer>
    );
  }
}

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.objectOf(PropTypes.object)]),
  course: PropTypes.object
};

CourseForm.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  errors: []
};

export default CourseForm;
