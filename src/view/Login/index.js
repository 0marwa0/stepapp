/** @format */
import API from "../../API/index.js";
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
    };
  }

  handleChange(event, key) {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  }
  onSubmit = () => {
    let data = this.state.data;
    this.setState({ isLoading: true });
    let product = {
      name: "name2",
      description: "description",
      price: 200,
      subgroup: 1,
      components: [1],
    };
    API.login(
      data,
      (callback) => {
        this.setState({ isLogin: true });
        NotifyHandler.add("Title", "Message", {
          time: 2, // Time how much notification will be shown; default - 2
          animationDelay: 0.3, // Delay for notification animation; default - 0.3
          animationTimeFunc: "linear", // Animation func; default - 'linear'
          position: "RT", // Position. Options - 'RT', 'RB', 'LT', 'LB'; default - 'RT'; ('RT' - Right Top, 'LB' - Left Bottom)
          hide: true, // Hide after time (default - 2); default - true
          progress: true, // Show progress line (timeline); default - true
        });
        console.log(callback, "login data");
      },
      (i) => console.log(i, "failure")
    );

    // API.addProduct(product);

    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div className='login_page'>
        <div>
          <div className='input_wrapper '>
            <div>
              <AiOutlineUser className='eye_icon' />
              <input
                type='text'
                placeholder='Email'
                onChange={(e) => this.handleChange(e, "email")}
              />{" "}
            </div>
          </div>
          <br />
          <div className='input_wrapper '>
            <div>
              <BsLock className='eye_icon' />
              <input
                type='password'
                width='100%'
                placeholder='password'
                onChange={(e) => this.handleChange(e, "password")}
              />{" "}
            </div>
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
