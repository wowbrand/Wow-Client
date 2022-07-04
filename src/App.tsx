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
// import { Listdetails } from "./Views/Listdetails";
import { Createrestaurant } from "./Views/createrestaurant";
import { Restaurants } from "./Views/Restaurants";
import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

const App: FC = () => {
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

          <Route exact path="/:name">
            <Restaurants />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
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
