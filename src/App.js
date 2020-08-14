/** @format */

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./Navbar";
import MainLayoutRoute from "./MainLayoutRout.js";
import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "./view/Dashboard";
import Customer from "./view/Customer";
import Product from "./view/Product";
import Stuff from "./view/Stuff";
import Login from "./view/Login/index.js";
import { render } from "@testing-library/react";

class App extends React.Component {
  state = {
    isLogin: false,
  };
  Login = (data, callback) => {
    let myHeaders = new Headers();
    let raw = JSON.stringify(data);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "POST",
      headers: myHeaders,

      body: raw,
      redirect: "follow",
    };
    fetch("https://step-copy.herokuapp.com/dash/v1/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        callback(result);
        if (result.status) {
          this.setState({ isLogin: true });
        }
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    const Pages = (props) => {
      const Logout = () => {
        props.history.push("/");
        this.setState({ isLogin: true });
        console.log("log out");
      };

      return (
        <div>
          <Navbar Logout={Logout} />
          <Switch>
            <MainLayoutRoute
              path='/dashboard'
              exact
              component={Dashboard}
              isLogin={this.state.isLogin}
            />
            <MainLayoutRoute
              path='/customerlist'
              exact
              component={Customer}
              isLogin={this.state.isLogin}
            />
            <MainLayoutRoute
              path='/productlist'
              exact
              component={Product}
              isLogin={this.state.isLogin}
            />
            <MainLayoutRoute
              path='/stufflist'
              exact
              component={Stuff}
              isLogin={this.state.isLogin}
            />
          </Switch>
        </div>
      );
    };
    return (
      <div className='App'>
        <Switch>
          <MainLayoutRoute
            exact
            path='/'
            component={Login}
            Login={this.Login}
          />

          <MainLayoutRoute component={Pages} />
        </Switch>
      </div>
    );
  }
}

export default App;
