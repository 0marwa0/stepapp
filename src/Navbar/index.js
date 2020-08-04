/** @format */

import React from "react";
import "./index.css";
import { FaRegUserCircle } from "react-icons/fa";
const index = () => {
  return (
    <div className='navBar'>
      <div>
        <img
          src={require("../shared/Icon/Logo.png")}
          alt=''
          className='nav_icon'
          style={{ height: "27px" }}
        />
      </div>
      <div>
        <FaRegUserCircle color='white' className='nav_icon' size='24px' />
        {/* <img src={require("../shared/Icon/User.png")} /> */}
      </div>
    </div>
  );
};

export default index;
