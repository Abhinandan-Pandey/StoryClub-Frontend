import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "../Header/navigation";

export const PrivateRoute = ({ isAuthenticated,component:Component ,...rest }) => {
  // console.log(isAuthenticated,Component,rest)
  return(
  <div>
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header {...props}/>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  </div>
);
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
