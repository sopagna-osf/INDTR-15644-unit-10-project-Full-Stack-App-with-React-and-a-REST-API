import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; 
import { Provider } from './contexts/AppContext';
import api from './api';
import './css/global.css';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/header/Header';
import UserSignUp from './components/auth/UserSignUp';
import UserSignIn from './components/auth/UserSignIn';
import UserSignOut from './components/auth/UserSignOut';
import Courses from './components/course/Courses';
import CourseDetail from './components/course/CourseDetail';
import CreateCourse from './components/course/CreateCourse';
import UpdateCourse from './components/course/UpdateCourse';
import NotFound from './components/error/NotFound';
import Forbidden from './components/error/Forbidden';
import UnhandledError from './components/error/UnhandledError';

class App extends Component {
  constructor() {
    super();

    const user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      isAuthenticated: !!user,
      user
    };
  }

  signIn = async(email, password) => {
    const authToken = window.btoa(email + ':' + password);
    const headers = {
      'Authorization': `Basic ${authToken}`
    };
    
    try {
      const response = await api.get('/users', { headers });
      const user = { ...response.data, authToken: authToken };

      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ user, isAuthenticated: true });
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  signOut = () => {
    this.setState({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  }

  render() {
    return (
      <Provider value={{
        data: this.state,
        action: {
          signIn: this.signIn,
          signOut: this.signOut
        }
      }}>
        <Router>
          <Header />
          <hr/>
          <Switch>
            <Route exact path="/" component={ Courses } />
            <PrivateRoute exact path="/courses/create" component={ CreateCourse } />
            <PrivateRoute exact path="/courses/:id/update" component={ UpdateCourse } />
            <Route exact path="/courses/:id" component={ CourseDetail } />
            <Route path="/signup" component={ UserSignUp } />
            <Route path="/signin" component={ UserSignIn } />
            <Route path="/signout" component={ UserSignOut } />
            <Route path="/notfound" component={ NotFound } />
            <Route path="/forbidden" component={ Forbidden } />
            <Route path="/error" component={ UnhandledError } />
            <Route render={ () => <Redirect to="/notfound" /> } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
