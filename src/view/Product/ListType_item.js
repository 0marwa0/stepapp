/** @format */
import React from "react";
import "./index.css";
const ListType_item = (props) => {
  return (
    <div className='listType_item'>
      <img src='https://placeimg.com/640/480/any' alt='' />
      <span className='listType_content'>
        <p>{props.title}</p>
        <p>{props.price}</p>
        <p>{props.text}</p>
      </span>
      {/* <div className='order_ctrl'>{props.price}</div> */}
    </div>
  );
};

export default ListType_item;
