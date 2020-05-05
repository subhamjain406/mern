import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setCurrentUser } from "./actions/authAction";
import { logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
import setAuthToken from "./utility/setAuthToken";
import Store from "./store";

import "./App.css";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import Navbar from "./components/Layout/Navigation/Navigation";
import Landing from "./components/Layout/Landing/Landing";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-experience/AddExperience";
import AddEducation from "./components/add-education/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/PROFILE/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

const App = () => {
  if (localStorage.token) {
    //set auth token header
    setAuthToken(localStorage.token);

    //decode the token
    const decode = jwt_decode(localStorage.token);

    //get Current user
    axios
      .get("/api/user/current")
      .then((data) => {
        //set current user
        Store.dispatch(setCurrentUser(data.data));
      })
      .catch((err) => {
        console.log(err);
      });

    const currentTime = Date.now() / 1000;
    if (currentTime > decode.exp) {
      Store.dispatch(clearCurrentProfile());
      Store.dispatch(logoutUser());
      window.location.href = "/login";
    }
  }

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <div className="App">
          <Navbar page="register" />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:handle" component={Profile} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/feed" component={Posts} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post/:id" component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
