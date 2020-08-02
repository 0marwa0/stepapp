/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import Modal from "../../shared/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSortDown,
} from "@fortawesome/fontawesome-free-solid";
import { RiFilter2Line } from "react-icons/ri";
import "../../App.css";
import { FaSortDown } from "react-icons/fa";
import TabPanel from "./Tabs";
import "./index.css";
import { ProductSType_1, ProductSType_2 } from "./Products.js";
var data = [
  { id: "1", tabTitle: "Tab 1", tabContent: <ProductSType_1 /> },
  { id: "2", tabTitle: "Tab 2", tabContent: <ProductSType_2 /> },
];

function ProductFilter(listType_1, listType_2) {
  const [showModel, setModel] = useState(false);
  const DisplayModel = (show) => {
    setModel(show);
  };
  const _handleTabChange = (index) => {
    console.log("Selected tab index", index);
  };
  const ListName = "product";
  return (
    <div className='container'>
      <div className=''>
        <div className='customize_filter'>
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
          </div>
          <div>
            <button className='List_btn btn' onClick={() => DisplayModel(true)}>
              <span>
                <FontAwesomeIcon icon={faPlus} className='plus_icon' />
              </span>
              <span>Add</span>
            </button>
          </div>
        </div>
        <TabPanel onTabChange={_handleTabChange}>
          <div title='Tab 1'>
            <ProductSType_1 />
          </div>
          <div title='Tab 2'>
            <ProductSType_2 />
          </div>
        </TabPanel>
      </div>

      {showModel ? (
        <Modal
          modalButton='Create New Item'
          modalPurpose='From here you can add products to your list'
          modalTitle='Add new Product'
          width='60%'
          height='70%'
          onCLose={() => DisplayModel(false)}>
          <CreateProduct />
        </Modal>
      ) : null}
    </div>
  );
}

export default ProductFilter;
