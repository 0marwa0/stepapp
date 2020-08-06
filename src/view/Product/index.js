/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import ListFooter from "../../shared/List/List_footer";

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
    showDeleteModel: false,
    list: true,
    burger: false,
    showModel: false,
    Data: [],
    checkedAll: false,
    currentPage: 1,
    pagePerOnce: 4,
    isLoading: false,
    pageNumber: 0,
  };
  showDeleteModel = (showDeleteModel) => {
    this.setState({ showDeleteModel });
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
  prevPage = () => {
    const currentPage = this.state.currentPage;
    if (currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    const currentPage = this.state.currentPage;
    const totalPge = Math.ceil(Products.length / this.state.pagePerOnce);
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };
  render() {
    const ListName = "product";
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentProducts = Products.slice(indexOfFirstPage, indexOfLastPage);
    const totalPageNumber = Math.ceil(Products.length / this.state.pagePerOnce);
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
            DeleteModal={() => this.showDeleteModel(true)}
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
                  {CurrentProducts.map((item, i) => {
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
                <ListFooter
                  currentPage={this.state.currentPage}
                  searchResult={Products.length}
                  prevPage={this.prevPage}
                  nextPage={this.nextPage}
                  totalPageNumber={totalPageNumber}
                />
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
          {/* {this.state.showDeleteModel ? (
            <Modal
              modalButton='Delete Account'
              modalType='Delete'
              modalPurpose='Write the name with respect to letter casing '
              modalTitle='Delete customer '
              width='45%'
              height='50%'
              onCLose={() => this.showDeleteModel(false)}>
              <DeletToopLitp />
            </Modal>
          ) : null} */}
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
