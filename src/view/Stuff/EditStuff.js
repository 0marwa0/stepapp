/** @format */

import React from "react";
import "./index.css";

const index = () => {
  return (
    <div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>Employee name</p>
          <span className='input_border'>
            <input type='text' width='100%' placeholder='Hamdon AL-hamdoni' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Phone number</p>
          <span className='input_border '>
            <input type='text' width='100%' placeholder='0780123567' />
          </span>
        </div>
      </div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>E-mail</p>
          <span className='input_border'>
            <input type='text' width='200px' placeholder='email' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Team</p>
          <span className='input_border'>
            <input type='text' placeholder='lorem' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Birth year </p>
          <span className='input_border'>
            <input type='text' placeholder='1999' />
          </span>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Location</p>
          <span className='input_border'>
            <input type='text' placeholder='lorem' />
          </span>
        </div>
      </div>{" "}
    </div>
  );
};

export default index;
