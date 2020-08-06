/** @format */

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSortDown,
} from "@fortawesome/fontawesome-free-solid";
import { RiFilter2Line, RiErrorWarningLine } from "react-icons/ri";
import { FaSortDown, FaEdit, FaImage } from "react-icons/fa";
import { FaThList, FaBuromobelexperte } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { GiHamburgerMenu } from "react-icons/gi";
import "../../App.css";
function ListFilter({
  selectedData,
  showModal,
  ListName,
  DeleteModal,
  children,
  list,
  burger,
  listActive,
  burgerActive,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const showTooltipModel = () => {
    setShowTooltip(true);
  };
  const closeTooltipModel = () => {
    setShowTooltip(false);
    console.log(showTooltip, "on close");
  };
  return (
    <div>
      <div className='List_filter'>
        <span className='filter_holder'>
          <div className='input_wrapper'>
            <div>
              <input type='text' placeholder='Search for something ...' />
              <img
                src={require("../../shared/Icon/searchIcon.png")}
                height='13px'
                // className="searchIcon"
              />
            </div>
          </div>
          <div className='Filter_ctrl'>
            <RiFilter2Line
              style={{
                fontSize: "11px",
              }}
            />
            <p> Filter</p>
            <FaSortDown
              style={{
                fontSize: "8px",
                margin: "0 2px",
                color: "var(--light-gray)",
              }}
            />
          </div>{" "}
          <div className='btns_holder'>
            {selectedData.length != 0 ? (
              <div>
                {showTooltip ? (
                  <div class='tooltip_container'>
                    <div class='tooltip'>
                      <div className='tooltip_content'>
                        <span>
                          <RiErrorWarningLine className='warning_icon' />
                          Are you sure to delete this item ?
                        </span>

                        <span>
                          <button
                            className='btn btn_Edit'
                            onClick={closeTooltipModel}>
                            No
                          </button>
                          <button className='btn btn_ctrl'>Yes</button>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
                <button
                  className='btn btn_delete'
                  onClick={
                    ListName != "customer" ? showTooltipModel : DeleteModal
                  }>
                  Delete {selectedData.length} item
                </button>
              </div>
            ) : null}
            {selectedData.length == 1 ? (
              <div>
                <button className='btn btn_Edit'>
                  <FaEdit className='plus_icon' />
                  {selectedData.map((item) => item.itemName)}
                </button>
              </div>
            ) : null}
            {selectedData.length == 1 && ListName == "product" ? (
              <div>
                <button className='btn btn_Edit'>
                  <FaImage className='plus_icon' />
                  change image
                </button>
              </div>
            ) : null}
            <div className='btn_holder'>
              <button className='btn_ctrl btn' onClick={showModal}>
                <span>
                  <FontAwesomeIcon icon={faPlus} className='plus_icon' />
                </span>
                <span>Add</span>
              </button>
            </div>
            {ListName == "product" ? (
              <div className='list_type_wrapper'>
                <FaThList
                  className={list ? "list_type activeList" : "list_type "}
                  onClick={() => {
                    listActive(true);
                    burgerActive(false);
                  }}
                />{" "}
                <FaBuromobelexperte
                  className={burger ? "list_type activeList" : "list_type "}
                  onClick={() => {
                    listActive(false);
                    burgerActive(true);
                  }}
                />
              </div>
            ) : null}
          </div>
        </span>
      </div>
      {children}
    </div>
  );
}

export default ListFilter;
