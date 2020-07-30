import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSortDown,
} from "@fortawesome/fontawesome-free-solid";
import { RiFilter2Line } from "react-icons/ri";
import { FaSortDown } from "react-icons/fa";

const ListFilter = ({ showModal, ListName }) => {
  return (
    <div>
      <div className="List_filter">
        <span className="filter_holder">
          <div className="input_wrapper">
            <div>
              <input type="text" placeholder="Search for something ..." />
              <img
                src={require("../../shared/Icon/searchIcon.png")}
                height="9px"
                // className="searchIcon"
              />
            </div>
          </div>
          <div className="Filter_ctrl">
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
          </div>
          <div className="btn_holder">
            <button className="List_btn btn" onClick={showModal}>
              <span>
                <FontAwesomeIcon icon={faPlus} className="plus_icon" />
              </span>
              <span>Add</span>
            </button>
            {ListName == "product" ? (
              <div className="list_type_wrapper">
                <img
                  className="list_type"
                  src={require("../../shared/Icon/productIcon1.png")}
                />
                <img
                  className="list_type"
                  src={require("../../shared/Icon/productIcon2.png")}
                />
              </div>
            ) : null}
          </div>
        </span>
      </div>
    </div>
  );
};

export default ListFilter;
