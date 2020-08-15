/** @format */
import { addData } from "../../API/index.js";
import React, { Component } from "react";
import "./index.css";
import { FaEye, FaSpinner } from "react-icons/fa";
import { AiOutlineMail, AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineUser, AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { BsLock } from "react-icons/bs";
import { NotificationManager } from "react-notifications";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tost from "../../shared/Tost";
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
      email: "",
      password: "",
      errors: { email: "", password: "" },
    };
  }

  handleEmailChange = (event) => {
    let value = event.target.value;
    let data = this.state.data;
    this.setState({ email: "" });
    data["email"] = value;
    if (data["email"].length == 0) {
      this.setState({ email: "Please enter your email!" });
    }
    this.setState({ data });
  };

  handlePasswordChange = (event) => {
    let value = event.target.value;
    let data = this.state.data;
    this.setState({ password: "" });
    data["password"] = value;
    if (data["password"].length == 0) {
      this.setState({ password: "Please enter your password!" });
    }
    this.setState({ data });
  };

  handleChange(event, key) {}
  onSubmit = (e) => {
    let loginData = this.state.data;
    e.preventDefault();

    if (this.state.data.email != 0 && this.state.data.password != 0) {
      this.setState({ isLoading: true });
      this.props.Login(loginData, (data) => {
        if (data.status) {
          this.setState({ isLogin: true });
          this.setState({ isLoading: false });
          this.props.history.push("/dashboard");

          localStorage.setItem("step_token", data.token);
        } else {
          this.setState({ isLoading: false });
          this.errorHandle(data.errMsg);
          this.props.history.push("/");
        }
      });
    } else {
      this.setState({ email: "Please enter your email!" });
      this.setState({ password: "Please enter your password!" });
    }
    if (localStorage.getItem("step_token"))
      this.props.history.push("/dashboard");
  };
  componentDidUpdate(prevProps, prevState) {
    if (localStorage.getItem("step_token")) {
      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {}
  errorHandle = (error) => {
    if (error.email) {
      toast(
        ` 
        ❌
      
      Email ${this.state.data.email} is not valid`,
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

      // this.setState({ emailErrorMsg: "email is not exist" });
    }

    if (error.err) {
      toast(` ❌ Wrong credentials`, {
        position: "top-center",
        autoClose: 2000,
        className: "tostStyleError",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // this.setState({ passErrorMsg: "Wrong credentials" });
    }
  };

  render() {
    return (
      <div>
        <div className='login_page'>
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
            <div
              className={
                this.state.email == "" ? "input_wrapper" : "input_error"
              }>
              <div className='login_input'>
                <input
                  type='text'
                  placeholder='Username'
                  onChange={(e) => this.handleEmailChange(e)}
                />
                <AiOutlineUser
                  className='login_icon'
                  color={this.state.email == "" ? "" : "red"}
                />
              </div>
              <p className='errorMsg'>{this.state.email}</p>
            </div>
            <div
              className={
                this.state.password == "" ? "input_wrapper" : "input_error"
              }>
              <div className='login_input'>
                <BsLock
                  className='login_icon'
                  color={this.state.password == "" ? "" : "red"}
                />
                <input
                  type='password'
                  width='100%'
                  placeholder='Password'
                  onChange={(e) => this.handlePasswordChange(e)}
                />
              </div>
              <p className='errorMsg'>{this.state.password}</p>
            </div>

            <button
              disabled={this.state.isLoading ? true : false}
              className={
                this.state.isLoading ? "btn btn_ctrl loading" : "btn btn_ctrl"
              }
              onClick={this.onSubmit}>
              <div className='login_btn'>
                {this.state.isLoading ? (
                  <Loader type='Oval' color='white' height={15} width={15} />
                ) : null}{" "}
                Log in
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
