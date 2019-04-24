import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

import AppContext from '../../contexts/AppContext';
import ValidationError from '../error/ValidationError';

class UserSignUp extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        firstName: null,
        lastName: null,
        emailAddress: null,
        password: null,
        confirmPassword: null
      },
      errors: null
    };
  }

  handleChange = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;

    api.post('/users', this.state.user)
    .then(response => {
      this.context.action.signIn(this.state.user.emailAddress, this.state.user.password)
      .then(response => {
        history.push('/');
      })
      .catch(err => {
        if (err.response.status === 500) {
          return history.push('/error');
        }
      });
    })
    .catch(err => {
      if (err.response.status === 500) {
        this.props.history.push('/error');
      } else {
        this.setState({ errors: err.response.data.error });
      }
    });
  }

  render() {
    const { history } = this.props;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <ValidationError errors={ this.state.errors } />
            <form>
              <div><input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={ this.handleChange } /></div>
              <div><input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={ this.handleChange } /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={ this.handleChange } /></div>
              <div><input id="password" name="password" type="password" placeholder="Password" onChange={ this.handleChange } /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={ this.handleChange } /></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={ this.handleSubmit }>Sign Up</button>
                <button className="button button-secondary" type="button" onClick={ () => history.push('/') }>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}

UserSignUp.contextType = AppContext;

export default UserSignUp;
