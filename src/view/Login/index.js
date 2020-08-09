/** @format */
import API from "../../API/index.js";
import React, { Component } from "react";
import "./index.css";
import { FaEye, FaSpinner } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { BsLock } from "react-icons/bs";
import Axios from "axios";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      isLoading: false,
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
    // API.login(data);

    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(
      "https://step-copy.herokuapp.com/dash/v1/login",
      options
    ).then((resp) => resp.json());
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
