import React from "react";
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
}) => {
  let id = `test${itemNumber}`;
  return (
    <div className="List_item">
      <div>
        <input type="checkbox" id={id} />
        <label for={id}></label>
      </div>
      <div>{itemNumber}</div>

      <div>{itemName}</div>
      {/* <FontAwesomeIcon icon={icon} /> */}
      <img src={require(`../../shared/Icon/${icon}`)} height="15px" />
      <span>{type}</span>

      <div>{mostOrder}</div>
      <div className={listName == "product" ? null : "order_ctrl"}>
        {orderValue}
      </div>
      {listName == "product" ? (
        <div className="order_ctrl">{ratingRate}</div>
      ) : (
        <div className="rate_ctrl">{ratingRate}</div>
      )}
    </div>
  );
};

export default ListItem;
