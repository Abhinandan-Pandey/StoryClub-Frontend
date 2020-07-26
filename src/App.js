import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Login from "./User/Pages/login";
import Stories from "./Home/pages/stories";
import Profile from "./Home/pages/profile";
import * as actions from "./Store/actions/index";
import PublicRoute from "./Router/publicRoute";
import PrivateRoute from "./Router/privateRoute";
import NotFoundPage from "./Home/pages/notFoundPage";

function App(props) {
const{onTryAutoSignup}=props
    onTryAutoSignup();

  const routes = (
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PrivateRoute path="/home" exact component={Stories} />
      <PrivateRoute path="/profile/:uid" exact component={Profile} />
      <PrivateRoute path="/StoryClub" exact component={Stories} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  return <div>{routes}</div>;
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
