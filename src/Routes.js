import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import ImageUpload from "./containers/ImageUpload";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Results from "./containers/Results";
import Search from "./containers/Search";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route  exact path="/">
        <Home />
      </Route >
	  <UnauthenticatedRoute  exact path="/login">
        <Login />
      </UnauthenticatedRoute >
	  <UnauthenticatedRoute  exact path="/signup">
        <Signup />
      </UnauthenticatedRoute >
	  <AuthenticatedRoute  exact path="/ImageUpload">
        <ImageUpload />
      </AuthenticatedRoute >
	  <AuthenticatedRoute  exact path="/Search">
        <Search />
      </AuthenticatedRoute >
	  <AuthenticatedRoute  exact path="/Results">
        <Results />
      </AuthenticatedRoute >
	  {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}