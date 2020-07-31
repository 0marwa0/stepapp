/** @format */

import "./index.css";
import React from "react";
import "../../../App.css";
const index = () => {
  return (
    <div className='DeleteModal'>
      <div>
        <p className='alert_text'>
          if you delete this account it will be gone permenantly
        </p>

        <p> also there is no way to undothis action after it's done</p>
        <p>
          To delete the acount write the customer name with respect to letter
          casing
          <span> "Ali Hammandi"</span>
        </p>
      </div>
      <div className='input_wrapper'>
        <div>
          <input type='text' />
        </div>
      </div>
    </div>
  );
};

export default index;
