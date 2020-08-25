/** @format */

import React from "react";
import "./index.css";
import { AiOutlineLock } from "react-icons/ai";
function Index({ handelInputChange }) {
  return (
    <div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>Costumer name</p>
          <span className='input_border'>
            <input
              type='text'
              width='100%'
              onChange={(e) => handelInputChange(e, "name")}
              // placeholder='test'
            />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Phone number</p>
          <span className='input_border '>
            <input
              type='text'
              width='100%'
              onChange={(e) => handelInputChange(e, "phone")}
              // placeholder='0780123567'
            />
          </span>
        </div>
      </div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>degree</p>
          <span className='input_border'>
            <input
              type='text'
              width='200px'
              onChange={(e) => handelInputChange(e, "dgree")}
              // placeholder='Autafia'
            />
          </span>
        </div>

        <div className='input_wrapper space_wrapper'>
          <p>Speciality</p>
          <span className='input_border'>
            <input
              type='text'
              // placeholder='Trauma'
              onChange={(e) => handelInputChange(e, "specialty")}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Index;
