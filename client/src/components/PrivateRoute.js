import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../contexts/AppContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {
        context => (
          <Route
            {...rest}
            render={props =>
              context.data.isAuthenticated ?
              <Component {...props} />
              :
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            }
          />
        )
      }
    </Consumer>
  );
};

export default PrivateRoute;
