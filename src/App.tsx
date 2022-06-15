import React, { FC } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import './App.css';
import { Navigationbar } from './components/Navigationbar';
import { Home } from './Views/Home';
import { List } from './Views/List';
import { Register } from './Views/Register';
import { Login } from './Views/Login';
import { Profile } from './Views/Profile';
import { Listdetails } from './Views/Listdetails';

const App: FC = () => {
  return (
    <div >
      <Router>
        <Navigationbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/list">
            <List />
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
          <Route exact path="/:id">
            <Listdetails />
          </Route>
        </Switch>
      </Router>





    </div>
  );
}

export default App;
