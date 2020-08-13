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
            <input
              type='text'
              width='100%'
              onChange={(e) => this.props.handelInputChange(e, "name")}
              placeholder='name'
            />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Phone number</p>
          <span className='input_border '>
            <input
              type='text'
              width='100%'
              onChange={(e) => this.props.handelInputChange(e, "phone")}
              placeholder='0780123567'
            />
          </span>
        </div>
      </div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>E-mail</p>
          <span className='input_border'>
            <input
              type='text'
              onChange={(e) => this.props.handelInputChange(e, "email")}
              width='200px'
              placeholder='email'
            />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Team</p>
          <span className='input_border'>
            <input
              type='text'
              onChange={(e) => this.props.handelInputChange(e, "type")}
              placeholder='lorem'
            />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Birth year </p>
          <span className='input_border'>
            <input
              type='text'
              onChange={(e) => this.props.handelInputChange(e, "birthday")}
              placeholder='1999'
            />
          </span>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Location</p>
          <span className='input_border'>
            <input
              type='text'
              onChange={(e) => this.props.handelInputChange(e, "location")}
              placeholder='lorem'
            />
          </span>
        </div>
      </div>{" "}
    </div>
  );
};

export default index;
