/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import ListFooter from "../../shared/List/List_footer";

import Header from "../../shared/header";
import "../../shared/List/index.css";

import "../../App.css";
import "./index.css";
import ProductFilter from "./ProductFilter";

import "../../shared/List/index.css";
import CreateProduct from "./CreateProduct";
import EditProduct from "./CreateProduct/EditProduct";
import Modal from "../../shared/Modal";
import { Products } from "../../fakeData/";
import ListItem from "../../shared/List/List_Item";
import "../../App.css";
import API from "../../API/index";
import "./index.css";
import UploadImage from "././CreateProduct/UploadImage";
import ListHead from "../../shared/List//List_head";
import ListType_item from "./ListType_item";
import SideNav from "../../shared/SideModel/index.js";
import Category from "../../API/middleware/Category";
import SubGroup from "../../API/middleware/SubGroup";
import Group from "../../API/middleware/Groups";
export default class index extends React.Component {
  state = {
    showModel: false,
    showUploadModel: false,
    showEditModel: false,
    list: true,
    burger: false,
    showModel: false,
    Data: [],
    checkedAll: false,
    currentPage: 1,
    pagePerOnce: 4,
    isLoading: false,
    pageNumber: 0,
    Products: Products,
    showSideNav: false,
    category: [],
    groups: [],
    subgroups: [],
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
  DisplayEditModel = (showEditModel) => {
    this.setState({ showEditModel });
  };
  handleOutsideClick(e) {
    // if (this.node.contains(e.target)) {
    //   return;
    // }

    this.DisplaySideNav();
  }

  DisplaySideNav = (showSideNav) => {
    // !this.state.showSideNav
    //   ? document.addEventListener("click", () => this.handleOutsideClick, false)
    //   : document.addEventListener(
    //       "click",
    //       () => this.handleOutsideClick,
    //       false
    //     );
    this.setState({ showSideNav });
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
  componentDidMount() {
    Category.getCategory((categories) => this.setState({ categories }));
    Group.getGroups((groups) => this.setState({ groups }));
    SubGroup.getSubGroup((subgroups) => this.setState({ subgroups }));
  }

  render() {
    const ListName = "product";
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentProducts = Products.slice(indexOfFirstPage, indexOfLastPage);
    const totalPageNumber = Math.ceil(Products.length / this.state.pagePerOnce);
    return (
      <div>
        <Header
          slug='Products List'
          DisplaySideNav={() => this.DisplaySideNav(true)}
        />
        <div className='container'>
          <ListFilter
            selectedData={this.state.Data}
            showModal={() => this.DisplayModel(true)}
            ListName='product'
            list={this.state.list}
            burger={this.state.burger}
            listActive={this.listActive}
            burgerActive={this.burgerActive}
            DisplayUploadModel={() => this.DisplayUploadModel(true)}
            DisplayEditModel={() => this.DisplayEditModel(true)}>
            {this.state.list ? (
              <div>
                <div className='List_Wrapper'>
                  <ListHead
                    listName='Product'
                    SelectAll={this.SelectAll}
                    checkedAll={this.state.checkedAll}
                    style='productItem'
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
                        itemName={item.name}
                        style='productItem'
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
              width='50%'
              height='100%'
              // fun={() => this.DisplayUploadModel(true)}
              onCLose={() => this.DisplayModel(false)}>
              <CreateProduct />
            </Modal>
          ) : null}
          {this.state.showEditModel ? (
            <Modal
              modalButton='Save Edit'
              modalPurpose=''
              modalTitle='Edit product'
              width='50%'
              height='55%'
              // fun={() => this.DisplayUploadModel(true)}
              onCLose={() => this.DisplayEditModel(false)}>
              <EditProduct />
            </Modal>
          ) : null}
          {this.state.showUploadModel ? (
            <Modal
              // isMulti={true}
              modalButton='Save Edit'
              modalPurpose=''
              modalTitle='Change image'
              width='50%'
              height='70%'
              // onBack={() => {
              //   DisplayModel(true);
              //   DisplayUploadModel(false);
              // }}
              onCLose={() => this.DisplayUploadModel(false)}>
              <UploadImage />
            </Modal>
          ) : null}
          {this.state.showSideNav && (
            <SideNav
              categories={this.state.categories}
              groups={this.state.groups}
              subgroups={this.state.subgroups}
              deleteItem={this.deleteItem}
              DisplaySideNav={this.DisplaySideNav}
            />
          )}
        </div>
      </div>
    );
  }
}
