/** @format */

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./Navbar";

import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "./view/Dashboard";
import Customer from "./view/Customer";
import Product from "./view/Product";
import Stuff from "./view/Stuff";
import Login from "./view/Login/index.js";
export const Pages = (props) => {
  const Logout = () => {
    props.history.push("/");
    console.log("log out");
  };
  return (
    <div>
      <Navbar Logout={Logout} />
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/customerlist' exact component={Customer} />
        <Route path='/productlist' exact component={Product} />
        <Route path='/stufflist' exact component={Stuff} />
      </Switch>
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route component={Pages} />
      </Switch>
    </div>
  );
}

export default App;
