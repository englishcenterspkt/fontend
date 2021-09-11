import React from "react";
import Login from "../screens/login/Login";
import Admin from "../screens/admin/Admin";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function MainRoute() {
  return (
    <Router>
      <ToastContainer closeButton={true} position="bottom-right" />
      <>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </>
    </Router>
  );
}
