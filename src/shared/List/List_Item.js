/** @format */

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IoMdImage } from "react-icons/io";
import { RiRoadMapLine } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";

const ListItem = ({
  itemName,
  listName,
  icon,
  itemNumber,
  type,
  mostOrder,
  orderValue,
  ratingRate,
  checked,
  showModal,
  onSelect,
  isSelected,
  checkboxValue,
}) => {
  let id = `test${itemNumber}`;

  return (
    <div className={isSelected ? "List_item selected_Item" : "List_item"}>
      <div>
        <input
          type='checkbox'
          id={id}
          onChange={onSelect}
          value={checkboxValue}
        />
        <label for={id}></label>
      </div>
      <div>{itemNumber}</div>

      <div>{itemName}</div>

      {
        <div>
          {listName == "product" ? (
            <IoMdImage className='Item_Icon' />
          ) : (
            <AiFillLock className='Item_Icon' onClick={showModal} />
          )}
        </div>
      }

      <span>{type}</span>

      <div>{mostOrder}</div>
      <div className={listName == "product" ? null : "order_ctrl"}>
        {orderValue}
      </div>
      {listName == "product" ? (
        <div className='order_ctrl'>{ratingRate}</div>
      ) : (
        <div className='rate_ctrl'>{ratingRate}</div>
      )}
    </div>
  );
};

export default ListItem;
