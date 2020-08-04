/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import Modal from "../../shared/Modal";
import Header from "../../shared/header";

import "../../shared/List/index.css";
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
import { FaThList, FaBuromobelexperte } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import UploadImage from "./CreateProduct/UploadImage";
import "../../shared/List/index.css";
import { ProductSType_1, ProductSType_2 } from "./Products.js";
var data = [
  { id: "1", tabTitle: "Tab 1", tabContent: <ProductSType_1 /> },
  { id: "2", tabTitle: "Tab 2", tabContent: <ProductSType_2 /> },
];

function ProductFilter(listType_1, listType_2, selectedData) {
  const [showModel, setModel] = useState(false);
  const DisplayModel = (show) => {
    setModel(show);
  };
  const [showUploadModel, setUploadModel] = useState(false);
  const DisplayUploadModel = (showUpload) => {
    setUploadModel(showUpload);
  };
  const _handleTabChange = (index) => {
    console.log("Selected tab index", index);
  };

  const [list, SetListActive] = useState(true);
  const [burger, SetBurgerActive] = useState(false);
  const listActive = (list) => {
    SetListActive(list);
  };
  const burgerActive = (list) => {
    SetBurgerActive(list);
  };
  const ListName = "product";
  return (
    <div>
      <Header slug='Products List' />
      <div className='container'>
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
            {/* {ListName != "product" && selectedData.length != 0 ? (
            <button className='btn btn_delete' onClick={DeleteModal}>
              Delete
            </button>
          ) : null} */}
            <div className='btn_holder'>
              <button
                className='btn_ctrl btn'
                onClick={() => DisplayModel(true)}>
                <span>
                  <FontAwesomeIcon icon={faPlus} className='plus_icon' />
                </span>
                <span>Add</span>
              </button>

              {ListName == "product" ? (
                <div className='list_type_wrapper'>
                  <FaBuromobelexperte
                    className={burger ? "list_type activeList" : "list_type "}
                    onClick={() => {
                      listActive(false);
                      burgerActive(true);
                    }}
                  />
                  <FaThList
                    className={list ? "list_type activeList" : "list_type "}
                    onClick={() => {
                      listActive(true);
                      burgerActive(false);
                    }}
                  />
                </div>
              ) : null}
            </div>
          </span>
        </div>
        {list ? <ProductSType_1 /> : <ProductSType_2 />}
        {showModel ? (
          <Modal
            modalButton='Create New Item'
            modalPurpose='From here you can add products to your list'
            modalTitle='Add new Product'
            width='60%'
            height='70%'
            fun={() => DisplayUploadModel(true)}
            onCLose={() => DisplayModel(false)}>
            <CreateProduct />
          </Modal>
        ) : null}

        {showUploadModel ? (
          <Modal
            isMulti={true}
            modalButton='Create New Item'
            modalPurpose='From here you can add products to your list'
            modalTitle='Add new Product'
            width='60%'
            height='70%'
            onBack={() => {
              DisplayModel(true);
              DisplayUploadModel(false);
            }}
            onCLose={() => DisplayUploadModel(false)}>
            <UploadImage />
          </Modal>
        ) : null}
      </div>{" "}
    </div>
  );
}

export default ProductFilter;
