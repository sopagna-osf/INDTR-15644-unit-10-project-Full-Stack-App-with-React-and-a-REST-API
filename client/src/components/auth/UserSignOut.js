import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

class UserSignOut extends Component {
  componentWillUnmount() {
    this.context.action.signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

UserSignOut.contextType = AppContext;

export default UserSignOut;
