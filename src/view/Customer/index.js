/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "../../shared/List/List_Item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLessThan,
  faMap,
} from "@fortawesome/fontawesome-free-solid";
import { Customers } from "../../fakeData";
import ListHead from "../../shared/List//List_head";
import "../../shared/List/index.css";
import CustomerFilter from "./CustomerFilter";
import { RiRoadMapLine } from "react-icons/ri";
import ListFooter from "../../shared/List/List_footer";
import "../../shared/List/index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
      currentPage: 1,
      pagePerOnce: 4,
      isLoading: false,
      pageNumber: 0,
    };
  }
  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === Customers.length - 1) {
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
        Data: Customers,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };
  getData = () => {
    return Customers;
  };
  setPageNumber = () => {
    const totalCustomer = Customers.length;
    const perPage = this.state.pagePerOnce;
    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(totalCustomer / perPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  componentDidMount() {
    const fetchCustomers = async () => {
      this.setState({ isLoading: true });
      const res = await this.getData;
      this.setState({ isLoading: false });
    };
  }

  prevPage = () => {
    const currentPage = this.state.currentPage;
    const totalPge = Math.ceil(Customers.length / this.state.pagePerOnce);
    if (currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    const currentPage = this.state.currentPage;
    const totalPge = Math.ceil(Customers.length / this.state.pagePerOnce);
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
    const CurrentCustomers = Customers.slice(indexOfFirstPage, indexOfLastPage);
    const totalPageNumber = Math.ceil(
      Customers.length / this.state.pagePerOnce
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
              checkedAll={this.state.checkedAll}
              fieldsName={[
                "Specialty",
                "Most ordered Kit",
                "Order value",
                "Rating rate",
              ]}
            />
            {CurrentCustomers.map((item, i) => {
              return (
                <ListItem
                  listName='customer'
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
                  onChange={(e) => this.checked(e, item)}
                  checked={this.isSelected(item.id) ? true : ""}
                />
              );
            })}

            <ListFooter
              currentPage={this.state.currentPage}
              searchResult={Customers.length}
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
