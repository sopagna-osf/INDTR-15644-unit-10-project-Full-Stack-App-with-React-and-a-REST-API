import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext, { Consumer } from '../../contexts/AppContext';

class UserSignIn extends Component {
  constructor() {
    super();

    this.state = {
      isUnauthorized: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.context.action.signIn(this.emailInput.value, this.passwordInput.value)
    .catch(err => {
      const { status } = err.response;

      if (status === 500) {
        this.props.history.push('/error');
      } else {
        this.setState({ isUnauthorized: status === 401 });
      }
    });
  }

  render() {
    const { history } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    return (
      <Consumer>
        {
          context => (
            context.data.isAuthenticated ?
            <Redirect to={ from } />
            :
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                { this.state.isUnauthorized ? <h3 className="error">Email Address/Password is incorrect!</h3> : null }
                <div>
                  <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" ref={ref => this.emailInput = ref } /></div>
                    <div><input id="password" name="password" type="password" placeholder="Password" ref={ref => this.passwordInput = ref } /></div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit" onClick={ this.handleSubmit }>Sign In</button>
                      <button className="button button-secondary" type="button" onClick={ () => history.push('/') }>Cancel</button>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
              </div>
            </div>
          )
        }
      </Consumer>
    );
  }
}

UserSignIn.contextType = AppContext;

export default UserSignIn;
