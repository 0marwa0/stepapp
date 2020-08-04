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

import "../../shared/List/index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
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
  render() {
    const listName = "Customer";
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
            {Customers.map((item, i) => {
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

            <div className='List_footer'>
              <p>
                the results of your search is {Customers.length} items out of{" "}
                {Customers.length} item
              </p>
              <div>
                <FontAwesomeIcon icon={faLessThan} className='icon' />
                <p>1/1</p>{" "}
                <FontAwesomeIcon icon={faGreaterThan} className='icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
