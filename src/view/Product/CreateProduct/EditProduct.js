/** @format */

import React from "react";
import "../CreateProduct/index.css";

export class EditProduct extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>Product name</p>
            <span className='input_border'>
              <input
                type='text'
                width='100%'
                onChange={(e) => this.props.handelInputChange(e, "name")}
                placeholder='$ type calvide'
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Price</p>
            <span className='input_border '>
              <input
                type='text'
                width='100%'
                placeholder='1,000$'
                onChange={(e) => this.props.handelInputChange(e, "price")}
              />
            </span>
          </div>
        </div>
        <div className='warp_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>3rd stage category</p>
            <span className='input_border'>
              <input type='text' width='200px' placeholder='select a person' />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>2nd stage category</p>
            <span className='input_border'>
              <input type='text' placeholder='select a person' />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>1st stage category</p>
            <span className='input_border'>
              <input type='text' placeholder='select a person' />
            </span>
          </div>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Component</p>
          <span className='input_border'>
            <input
              type='text'
              width='100%'
              onChange={(e) => this.porps.handelInputChange(e, "component")}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default EditProduct;
