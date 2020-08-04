/** @format */

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSortDown,
} from "@fortawesome/fontawesome-free-solid";
import { RiFilter2Line } from "react-icons/ri";

import { FaSortDown, FaEdit } from "react-icons/fa";
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
          {selectedData.length != 0 ? (
            <div>
              <button className='btn btn_delete' onClick={DeleteModal}>
                Delete
              </button>
            </div>
          ) : null}
          {selectedData.length == 1 ? (
            <div>
              <button className='btn btn_Edit'>
                <FaEdit className='plus_icon' />
                Edit
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
