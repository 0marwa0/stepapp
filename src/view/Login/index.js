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
      emailErrorMsg: "",
      passErrorMsg: "",
    };
  }

  handleChange(event, key) {
    let value = event.target.value;
    // if (value.length === 0) {
    //   this.setState({ emailErrorMsg: "", passErrorMsg: "" });
    // }
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });

    this.setState({ emailErrorMsg: "", passErrorMsg: "" });
  }
  onSubmit = () => {
    let data = this.state.data;
    console.log(data.length, "login data length");
    if (this.state.data.email === "" && this.state.data.email === "") {
      this.setState({
        emailErrorMsg: "Please enter your Email!",
        passErrorMsg: "Please enter your password",
      });
    } else {
      this.setState({ isLoading: true });
      this.props.Login(data, (data) => {
        if (data.status) {
          toast("Login Successfully");
          this.setState({ isLoading: false, isLogin: true });

          localStorage.setItem("step_token", data.token);
          console.log(data);
          this.props.history.push({
            pathname: "/dashboard",
            state: {
              show: "show",
            },
          });
        } else {
          this.setState({ isLoading: false });
          this.errorHandle(data.errMsg);
          console.log(data.errMsg);
          this.props.history.push("/");
        }
      });
    }

    // this.status.errMsg.err
    //   ? this.setState({ passErrorMsg: " wrong password" })
    //   : null;
  };
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
            <div className='input_wrapper '>
              <div className='login_input'>
                {/* <AiOutlineUser className='eye_icon' /> */}
                <input
                  type='text'
                  placeholder='Email'
                  onChange={(e) => this.handleChange(e, "email")}
                />
              </div>
              <p className='errorMsg'>{this.state.emailErrorMsg}</p>
            </div>

            <div className='input_wrapper '>
              <div className='login_input'>
                {/* <BsLock className='eye_icon' /> */}
                <input
                  type='password'
                  width='100%'
                  placeholder='password'
                  onChange={(e) => this.handleChange(e, "password")}
                />
              </div>
              <p className='errorMsg'>{this.state.passErrorMsg}</p>
            </div>

            <button
              disabled={this.state.data.length === 0 ? true : false}
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
