import React, { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Navigationbar } from "./components/Navigationbar";
import { Home } from "./Views/Home";
import { List } from "./Views/List";
import { Register } from "./Views/Register";
import { Login } from "./Views/Login";
import { Profile } from "./Views/Profile";
import { Logout } from "./Views/Logout";
// import { Listdetails } from "./Views/Listdetails";
import { Createrestaurant } from "./Views/createrestaurant";
import { Restaurants } from "./Views/Restaurants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "./components/Map";
import { getToken } from "./utils/getToken.js";

const App: FC = () => {
  const [user, setUser] = useState(false);

  const checkIfUserIsLoggedIn = () => {
    const token = getToken();
    if (token) {
      console.log("logged in");
      setUser(true);
    } else {
      console.log("not logged");
      setUser(false);
    }
  };
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [user]);
  return (
    <div>
      <Router>
        <Navigationbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/list">
            <List />
          </Route>

          <Route exact path="/createrestaurant">
            <Createrestaurant />
          </Route>

          <Route exact path="/restaurants/:name">
            <Restaurants />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          {/* <Route exact path="restaurants/:name">
            <Restaurants />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
