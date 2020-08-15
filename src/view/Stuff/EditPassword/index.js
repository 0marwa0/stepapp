/** @format */

import React from "react";
import "./index.css";
import "../../../App.css";
import { FaEye } from "react-icons/fa";

const EditPassword = ({ handelInputChange }) => {
  return (
    <div className='edit_model'>
      <p className='alert_text'>
        if you renewed this old password will not work again
      </p>
      <p>also there is no way to undo this action after it's done</p>
      <p>
        The password could be any combination of letters ,numbers and symbols
      </p>
      <br />
      <div className='input_wrapper '>
        <div>
          <input
            type='password'
            width='100%'
            onChange={(e) => handelInputChange(e, "password")}
          />

          {/* <FaEye className='eye_icon' /> */}
        </div>
      </div>
      <br />
      <div className='input_wrapper '>
        <div>
          <input type='password' width='100%' />
          {/* <FaEye className='eye_icon' /> */}
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
