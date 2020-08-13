/** @format */
import { addData } from "../../API/index.js";
import React, { Component } from "react";
import "./index.css";
import { FaEye, FaSpinner } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { BsLock } from "react-icons/bs";
import { NotificationManager } from "react-notifications";
import Axios from "axios";
import { NotifyHandler, NotifyComponent } from "react-notification-component";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      isLoading: false,
      isLogin: false,
      errorMsg: "",
      emailErrorMsg: "",
      passErrorMsg: "",
    };
  }

  handleChange(event, key) {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
    this.setState({ emailErrorMsg: "", passErrorMsg: "" });
  }
  onSubmit = () => {
    let data = this.state.data;
    this.setState({ isLoading: true });
    this.login(data, (data) => {
      if (data.status) {
        this.setState({ isLoading: false });
        localStorage.setItem("step_token", data.token);
        console.log(data);
        this.props.history.push("/dashboard");
      } else {
        this.setState({ isLoading: false });
        this.errorHandle(data.errMsg);
        console.log(data.errMsg);
        this.props.history.push("/");
      }
    });

    // this.status.errMsg.err
    //   ? this.setState({ passErrorMsg: " wrong password" })
    //   : null;
  };
  errorHandle = (error) => {
    if (error.email) {
      this.setState({ emailErrorMsg: "email is not exist" });
    }

    if (error.err) {
      this.setState({ passErrorMsg: "Wrong credentials" });
    }
  };
  login = (data, callback) => {
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
      .then((result) => callback(result))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className='login_page'>
        <div>
          <div className='input_wrapper '>
            <div className='login_input'>
              <AiOutlineUser className='eye_icon' />
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => this.handleChange(e, "email")}
              />
            </div>
            <p className='errorMsg'>{this.state.emailErrorMsg}</p>
          </div>
          <br />
          <div className='input_wrapper '>
            <div className='login_input'>
              <BsLock className='eye_icon' />
              <input
                type='password'
                width='100%'
                placeholder='password'
                onChange={(e) => this.handleChange(e, "password")}
              />
            </div>
            <p className='errorMsg'>{this.state.passErrorMsg}</p>{" "}
          </div>

          <br />
          <button className='btn btn_ctrl' onClick={this.onSubmit}>
            <div className='login_btn'>
              {this.state.isLoading ? (
                <Loader type='Oval' color='white' height={15} width={15} />
              ) : null}{" "}
              Log in
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default index;
