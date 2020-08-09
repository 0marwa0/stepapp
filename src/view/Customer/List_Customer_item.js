/** @format */

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IoMdImage } from "react-icons/io";
import { RiRoadMapLine } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";

const ListItem = ({
  itemName,

  itemNumber,
  ratingRate,
  mostOrder,
  orderValue,
  phone,
  className,
  showModal,
  onSelect,
  onChange,
  degree,
  specialty,
  checkboxValue,
  checked,
  style,
}) => {
  let id = `test${itemNumber}`;

  return (
    <div className={`${className}${" "} ${style}`}>
      <div>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={onChange}
          value={checkboxValue}
        />
        <label for={id}></label>
      </div>
      <div>{itemNumber}</div>

      <div>{itemName}</div>

      <span>{phone}</span>

      <div>{specialty}</div>
      <div>{degree}</div>
      <div>{mostOrder}</div>
      <div className='order_ctrl'>{orderValue}</div>

      <div className='rate_ctrl'>{ratingRate}</div>
    </div>
  );
};

export default ListItem;
