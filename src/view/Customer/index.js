/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "./List_Customer_item.js";
import { loadData } from "../../API";

// import { Customers } from "../../fakeData";

import ListHead from "../../shared/List//List_head";
import "../../shared/List/index.css";
import CustomerFilter from "./CustomerFilter";
import ListFooter from "../../shared/List/List_footer";
import "../../shared/List/index.css";
import Loader from "react-loader-spinner";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
      currentPage: 1,
      pagePerOnce: 4,
      isLoading: true,
      pageNumber: 0,
      Customers: [],
    };
  }
  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === this.state.Customers.length - 1) {
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
        Data: this.state.Customers,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };

  componentDidMount() {
    loadData("users", (errorMsg, data) => {
      this.setState({ isLoading: false });
      for (let i = 0; i < data.users.length; i++) {
        this.setState({ Customers: data.users[0] });
      }
    });
  }

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
    const totalPge = Math.ceil(
      this.state.Customers.length / this.state.pagePerOnce
    );
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const listName = "Customer";
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentCustomers = this.state.Customers.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    const totalPageNumber = Math.ceil(
      this.state.Customers.length / this.state.pagePerOnce
    );
    return (
      <div>
        <Header slug='Customer list' />
        <div className='container'>
          <CustomerFilter selectedData={this.state.Data} />

          <div className='List_Wrapper'>
            <ListHead
              listName='Customer'
              SelectAll={this.SelectAll}
              style='customerItem'
              checkedAll={this.state.checkedAll}
              fieldsName={[
                "Phone Number",
                "Specialty",
                "Degree",
                "Most ordered Kit",
                "Order value",
                "Rating rate",
              ]}
            />

            {this.state.isLoading ? (
              <div className='loader_wrapper'>
                <Loader
                  type='ThreeDots'
                  color='var(--blue)'
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <div>
                {CurrentCustomers.map((item, i) => {
                  return (
                    <ListItem
                      listName='customer'
                      style='customerItem'
                      itemName={item.name}
                      className={
                        this.isSelected(item.id)
                          ? "List_item selected_Item"
                          : "List_item"
                      }
                      itemNumber={i + 1}
                      specialty={item.specialty}
                      degree={item.dgree}
                      phone={item.phone}
                      mostOrder={item.needOtp == null ? 0 : item.needOtp}
                      orderValue={item.orderValue == null ? 0 : item.orderValue}
                      ratingRate={item.ratingRate == null ? 0 : item.ratingRate}
                      onChange={(e) => this.checked(e, item)}
                      checked={this.isSelected(item.id) ? true : ""}
                    />
                  );
                })}
              </div>
            )}
            <ListFooter
              currentPage={this.state.currentPage}
              searchResult={this.state.Customers.length}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              totalPageNumber={totalPageNumber}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
