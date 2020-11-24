import React, { Component, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./dashboard/Authentication/Login"));

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
