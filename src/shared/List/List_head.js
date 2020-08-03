/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/fontawesome-free-solid";
function ListHead({ fieldsName, listName }) {
  return (
    <div className='List_head'>
      <div className='SORTIcon'>
        <FontAwesomeIcon icon={faSort} className='icon' />
      </div>

      <div className='sort_icon_holder '>
        <div>#</div>
      </div>
      <div className='sort_icon_holder '>
        <div>{listName}Name</div>

        <FontAwesomeIcon icon={faSort} className='sort_icon' />
      </div>
      <div></div>
      {fieldsName.map((item, i) => (
        <div className='sort_icon_holder '>
          <div>{item}</div>
          {i == fieldsName.length - 1 ? null : (
            <FontAwesomeIcon icon={faSort} className='sort_icon' />
          )}
        </div>
      ))}
    </div>
  );
}

export default ListHead;
