/** @format */

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IoMdImage } from "react-icons/io";
import { RiRoadMapLine } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";

const ListItem = ({
  itemName,
  listName,
  price,
  itemNumber,
  email,
  team,
  location,
  birthday,
  phone,
  className,
  showModal,
  onSelect,
  onChange,
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
        <label htmlFor={id}></label>
      </div>
      <div>{itemNumber}</div>

      <div>{itemName}</div>

      <div>
        <AiFillLock className='Item_Icon' onClick={showModal} />
      </div>

      <span>{email}</span>

      <div>{phone}</div>
      <div>{birthday}</div>
      <div>{team}</div>
      <div>{location}</div>
    </div>
  );
};

export default ListItem;
