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
      isChecked: false,
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
    };
  }
  IsCheck = () => {
    this.setState({
      isChecked: true,
      checkboxValue: "off",
    });
  };
  componentWillReceiveProps(props) {
    this.IsCheck();

    return this.state.isChecked;
  }

  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
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

    console.log(e.target.type, "shuld be all th datas");
  };
  render() {
    const listName = "Customer";
    return (
      <div>
        <Header slug='Customer list' />
        <div className='container'>
          <CustomerFilter
            selectedData={this.state.Data}
            SelectAll={this.SelectAll}
          />

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
                <div
                  className={
                    this.isSelected(item.id)
                      ? "List_item selected_Item"
                      : "List_item"
                  }>
                  <div>
                    <input
                      type='checkbox'
                      id={`test${i + 1}`}
                      checked={this.isSelected(item.id) ? true : ""}
                      onChange={(e) => this.checked(e, item)}
                    />
                    <label for={`test${i + 1}`}></label>
                  </div>
                  <div>{i + 1}</div>

                  <div>{item.itemName}</div>
                  <div>
                    <RiRoadMapLine className='Item_Icon' />
                  </div>

                  <span>{item.type}</span>

                  <div>{item.mostOrder}</div>
                  <div className={listName == "product" ? null : "order_ctrl"}>
                    {item.orderValue}
                  </div>

                  {listName == "product" ? (
                    <div className='order_ctrl'>{item.ratingRate}</div>
                  ) : (
                    <div className='rate_ctrl'>{item.ratingRate}</div>
                  )}
                </div>
              );
            })}

            <div className='List_footer'>
              <p>
                the results of your search is {Customers.length} items out of{" "}
                {Customers.length} item
              </p>
              <div>
                <FontAwesomeIcon icon={faLessThan} className='icon' />
                <p>1/12</p>{" "}
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
