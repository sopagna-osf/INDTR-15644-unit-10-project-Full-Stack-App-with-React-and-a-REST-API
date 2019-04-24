import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkDown from 'react-markdown';
import api from '../../api';
import { Consumer } from '../../contexts/AppContext';

class CourseDetail extends Component {
  constructor() {
    super();

    this.state = {
      course: null
    };
  }

  componentWillMount() {
    const { match } = this.props;

    api.get('/courses/' + match.params.id)
    .then(response => {
      this.setState({ course: response.data });
    })
    .catch(err => {
      const { status } = err.response;

      if (status === 404) {
        this.props.history.push('/notfound');
      } else if (status === 500) {
        this.props.history.push('/error');
      } else {
        this.setState({ course: null });
      }
    });
  }

  deleteCourse = () => {
    const { match, history } = this.props;

    if (window.confirm('Do you want to delete this course?')) {
      api.delete('/courses/' + match.params.id)
      .then(response => {
        history.push('/');
      })
      .catch(err => {
        const { status } = err.response;

        if (status === 500) {
          history.push('/error');
        } else if (status === 403) {
          history.push('/forbidden');
        }
      });
    }
  }

  render() {
    const { course } = this.state;

    if (!course) {
      return null;
    }

    return (
      <Consumer>
        {
          context => (
            <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    {
                      context.data.isAuthenticated && course.user && context.data.user._id === course.user._id ?
                      <span>
                        <Link className="button" to={ `/courses/${course._id}/update` }>Update Course</Link>
                        <button className="button" onClick={ this.deleteCourse }>Delete Course</button>
                      </span>
                      : null
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                  </div>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{ course.title }</h3>
                    <p>By { course.user ? course.user.firstName + ' ' + course.user.lastName : '' }</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkDown source={ course.description } />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{ course.estimatedTime }</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkDown source={ course.materialsNeeded } />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Consumer>
    );
  }
}

export default CourseDetail;
