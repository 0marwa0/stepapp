/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";

import Header from "../../shared/header";
import "../../shared/List/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { RiFilter2Line } from "react-icons/ri";
import "../../App.css";
import { FaSortDown } from "react-icons/fa";
import "./index.css";
import ProductFilter from "./ProductFilter";
import { FaThList, FaBuromobelexperte } from "react-icons/fa";
import "../../shared/List/index.css";
import CreateProduct from "./CreateProduct";
import { ProductSType_1, ProductSType_2 } from "./Products.js";
import Modal from "../../shared/Modal";
import { Products } from "../../fakeData/";
import ListItem from "../../shared/List/List_Item";
import "../../App.css";
import {
  faGreaterThan,
  faLessThan,
  faUnlockAlt,
} from "@fortawesome/fontawesome-free-solid";
import "./index.css";

import ListHead from "../../shared/List//List_head";
import ListType_item from "./ListType_item";
export default class index extends React.Component {
  state = {
    showModel: false,
    showUploadModel: false,
    list: true,
    burger: false,
    showModel: false,
    Data: [],
    checkedAll: false,
  };

  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === Products.length - 1) {
        this.setState({
          checkedAll: true,
        });
      }
    } else {
      this.setState({ checkedAll: false });
      this.setState({
        Data: this.state.Data.filter(function (val) {
          return val !== item;
        }),
      });
    }
  };
  isSelected = (id) => {
    let checked = this.state.Data.some((item) => item.id == id);

    return checked;
  };
  SelectAll = (e) => {
    let selected = e.target.checked;

    if (selected) {
      this.setState({
        Data: Products,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };

  DisplayModel = (showModel) => {
    this.setState({ showModel });
  };
  DisplayUploadModel = (showUploadModel) => {
    this.setState({ showUploadModel });
  };

  listActive = (list) => {
    this.setState({ list });
  };
  burgerActive = (burger) => {
    this.setState({ burger });
  };

  render() {
    const ListName = "product";
    console.log(this.state.Data, "our product data");
    return (
      <div>
        <Header slug='Products List' />
        <div className='container'>
          <ListFilter
            selectedData={this.state.Data}
            showModal={() => this.DisplayModel(true)}
            ListName='product'
            list={this.state.list}
            burger={this.state.burger}
            listActive={this.listActive}
            burgerActive={this.burgerActive}

            // DeleteModal={() => this.DisplayDeleteModel(true)}
          >
            {this.state.list ? (
              <div>
                <div className='List_Wrapper'>
                  <ListHead
                    listName='Product'
                    SelectAll={this.SelectAll}
                    checkedAll={this.state.checkedAll}
                    fieldsName={[
                      "3rd stage category",
                      "2nd stage category",
                      "1st stage category",
                      "Price",
                    ]}
                  />
                  {Products.map((item, i) => {
                    return (
                      <ListItem
                        listName='product'
                        itemName={item.itemName}
                        className={
                          this.isSelected(item.id)
                            ? "List_item selected_Item"
                            : "List_item"
                        }
                        itemNumber={i + 1}
                        type={item.type}
                        mostOrder={item.mostOrder}
                        orderValue={item.orderValue}
                        ratingRate={item.ratingRate}
                        price={item.price}
                        onChange={(e) => this.checked(e, item)}
                        checked={this.isSelected(item.id) ? true : ""}
                      />
                    );
                  })}
                </div>
                <div className='List_footer'>
                  <p>
                    the results of your search is {Products.length} items out of{" "}
                    {Products.length} item{" "}
                  </p>
                  <div>
                    <FontAwesomeIcon icon={faLessThan} className='icon' />
                    <p>1/1</p>{" "}
                    <FontAwesomeIcon icon={faGreaterThan} className='icon' />
                  </div>
                </div>
              </div>
            ) : (
              <div className='ListType_2_wrapper'>
                {Products.map((item, i) => {
                  return (
                    <ListType_item
                      title={item.itemName}
                      head={item.orderValue}
                      text={item.mostOrder}
                      price={item.price}
                    />
                  );
                })}
              </div>
            )}
          </ListFilter>

          {this.state.showModel ? (
            <Modal
              modalButton='Create New Item'
              modalPurpose='From here you can add products to your list'
              modalTitle='Add new Product'
              width='60%'
              height='70%'
              fun={() => this.DisplayUploadModel(true)}
              onCLose={() => this.DisplayModel(false)}>
              <CreateProduct />
            </Modal>
          ) : null}

          {/* {showUploadModel ? (
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
      ) : null} */}
        </div>{" "}
      </div>
    );
  }
}
