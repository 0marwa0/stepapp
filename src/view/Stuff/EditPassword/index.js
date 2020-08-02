/** @format */

import React from "react";
import "./index.css";
import "../../../App.css";
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
      <br />
      <div className='input_wrapper space_wrapper'>
        <span className='input_border '>
          <input type='password' width='100%' placeholder='*********' />
        </span>
      </div>
      <br />
      <div className='input_wrapper space_wrapper'>
        <span className='input_border '>
          <input type='password' width='100%' />
        </span>
      </div>
    </div>
  );
};

export default EditPassword;
