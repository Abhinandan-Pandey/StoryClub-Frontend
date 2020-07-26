import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

 const PublicRoute = ({ isAuthenticated,component:Component,...rest }) => (
  <div>
    <Route
      {...rest}
      component={props=>
        isAuthenticated ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(PublicRoute);
