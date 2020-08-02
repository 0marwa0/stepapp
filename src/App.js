import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./Navbar";

import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "./view/Dashboard";
import Customer from "./view/Customer";
import Product from "./view/Product";
import Stuff from "./view/Stuff";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/customerlist" exact component={Customer} />
        <Route path="/productlist" exact component={Product} />
        <Route path="/stufflist" exact component={Stuff} />
      </Switch>
    </div>
  );
}

export default App;
