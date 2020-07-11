// functional component  
// takes parameters : component , authenticated and ...rest means spread the rest of the props?
// if authenticated is true redirect to home page else to component which called this function: login, signup ..

import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  // not isRequired because not always we have users want to sign up
  // user: PropTypes.object.isRequired
  user: PropTypes.object
}

const mapStateToProps = (state) =>({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute); 