/** @format */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import MainLayoutRoute from "./MainLayoutRout.js";
import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "./view/Dashboard";
import Customer from "./view/Customer";
import Product from "./view/Product";
import Stuff from "./view/Stuff";
import Login from "./view/Login/index.js";

class App extends React.Component {
  state = {
    isLogin: false,
  };
  componentDidMount() {}
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
          toast("Login Successfully");
          this.setState({ isLogin: true });
        }

        console.log(result, "login success");
      })

      .catch((error) => {
        console.log(error, "login failed");
        toast(
          `
          ❌

         Login Failed  `,
          {
            position: "top-center",
            autoClose: 2000,

            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };
  render() {
    const Pages = (props) => {
      const Logout = () => {
        localStorage.clear("step_token");
        props.history.push("/");
        this.setState({ isLogin: false });

        console.log("log out");
      };

      return (
        <div>
          <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
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
            isLogin={localStorage.getItem("isLogin")}
            Login={this.Login}
          />

          <MainLayoutRoute component={Pages} />
        </Switch>
      </div>
    );
  }
}

export default App;
