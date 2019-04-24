import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Consumer } from '../../contexts/AppContext';

const Nav = () => {
  return (
    <Consumer>
      {
        context => (
          context.data.isAuthenticated ?
          <nav>
            <span>Welcome { context.data.user.firstName + ' ' + context.data.user.lastName }!</span>
            <Link to="/signout">Sign Out</Link>
          </nav>
          :
          <nav>
            <NavLink className="signup" to="/signup">Sign Up</NavLink>
            <NavLink className="signin" to="/signin">Sign In</NavLink>
          </nav>
        )
      }
    </Consumer>
  );
};

export default Nav;
