/** @format */

import React from "react";
import "./index.css";
const EditPassword = () => {
  return (
    <div>
      <p className='alert_text'>
        if you renewed this old password will not work again
      </p>
      <p>also there is no way to undo this action after it's done</p>
      <p>
        The password could be any combination of letters ,numbers and symbols
      </p>
      <div className='input_wrapper'>
        <div>
          <input type='text' placeholder='password ...' />
          {/* <img
            src={require("../../shared/Icon/searchIcon.png")}
            height='9px'
            // className="searchIcon"
          /> */}
        </div>
        <div className='input_wrapper'>
          <div>
            <input type='text' placeholder='password ...' />
            {/* <img
              src={require("../../shared/Icon/searchIcon.png")}
              height='9px'
              // className="searchIcon"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
