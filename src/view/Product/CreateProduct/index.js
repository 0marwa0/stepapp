/** @format */

import React from "react";
import "./index.css";
import { AiOutlineLock } from "react-icons/ai";
const CreateProduct = () => {
  return (
    <div>
      <div className='two_col_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>Product name</p>
          <span className='input_border'>
            <input type='text' width='100%' placeholder='$ type calvide' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Price</p>
          <span className='input_border '>
            <input type='text' width='100%' placeholder='1,000$' />
          </span>
        </div>
      </div>
      <div className='warp_flex paddingTop'>
        <div className='input_wrapper space_wrapper'>
          <p>3rd stage category</p>
          <span className='input_border'>
            <input type='text' width='200px' placeholder='Unla' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>2nd stage category</p>
          <span className='input_border'>
            <input type='text' placeholder='Plates and Secrews' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>1st stage category</p>
          <span className='input_border'>
            <input type='text' placeholder='Trauma' />
          </span>
        </div>
        <div className='input_wrapper space_wrapper'>
          <p>Product Photo</p>
          <span className='input_border'>
            <input type='text' placeholder='Max size is 5MP' />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
