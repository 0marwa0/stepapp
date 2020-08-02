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
import { Customers } from "../../Store";
import ListHead from "../../shared/List//List_head";
import "../../shared/List/index.css";
import CustomerFilter from "./CustomerFilter";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false, ShowDeleteModal: false };
  }
  IsCheck = () => {
    this.setState({
      isChecked: true,
    });
  };
  componentWillReceiveProps(props) {
    this.IsCheck();

    return this.state.isChecked;
  }
  gitItem=(id)=>{
    let item = Customers.filter(u=>u.id==id)
    console.log( item,"selected item");
    return item
  }
  checked=(id)=>{
let item =this.gitItem(id);

  }
  render() {
    const listName="Customer"
    return (
      <div>
        <Header slug='Customer list' />
        <div className='container'>
          <CustomerFilter isChecked={this.state.isChecked} />

          <div className='List_Wrapper'>
            <ListHead
              listName='Customer'
              fieldsName={[
                "Specialty",
                "Most ordered Kit",
                "Order value",
                "Rating rate",
              ]}
            />
          {Customers.map((item,i)=>{
            return( 


<div className='List_item'>
      <div>

        <input type='checkbox' id={`test${i}`} onChange={this.checked(item.id)} />
        <label for={`test${i}`}></label>
      </div>
      <div>{i}</div>

      <div>{item.itemName}</div>
      <img
        // src={require(`../../shared/Icon/${icon}`)}
        height='15px'
        // onClick={showModal}
      />
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










            )})}
         
          
            <div className='List_footer'>
              <p>the results of your search is 500 items out of 10,000 item </p>
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
