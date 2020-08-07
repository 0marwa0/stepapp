/** @format */

import React, { Component } from "react";
import "./index.css";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }
  Active = (isActive) => {
    this.setState({ isActive });
  };
  componentDidMount() {
    // window.addEventListener('ondrag', this.Active(true));
  }
  render() {
    return (
      <div>
        <div className='upload_text'>Product photo</div>
        <div
          onDragOver={() => this.Active(true)}
          onDragLeave={() => this.Active(false)}
          className={
            this.state.isActive ? "upload_modal active" : "upload_modal "
          }>
          <img src={require("../../../shared/Icon/upload.png")} />
          <span>
            Drop file here or
            <input type='file' id='file' />
            <label for='file'> browse</label>
          </span>
        </div>
      </div>
    );
  }
}

export default index;
