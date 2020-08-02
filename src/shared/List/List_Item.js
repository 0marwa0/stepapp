/** @format */

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
}) => {
  let id = `test${itemNumber}`;

  return (
    <div className='List_item'>
      <div>
        <input type='checkbox' id={id} onChange={checked} />
        <label for={id}></label>
      </div>
      <div>{itemNumber}</div>

      <div>{itemName}</div>
      <img
        src={require(`../../shared/Icon/${icon}`)}
        height='15px'
        onClick={showModal}
      />
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
