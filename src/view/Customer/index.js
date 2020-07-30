import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "../../shared/List/List_Item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLessThan,
  faMap,
} from "@fortawesome/fontawesome-free-solid";

import ListHead from "../../shared/List//List_head";
import ListFilter from "../../shared/List//List_filter";
import "../../shared/List/index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header slug="Customer list" />
        <div className="container">
          <ListFilter />
          <div className="List_Wrapper">
            <ListHead
              listName="Customer"
              fieldsName={[
                "Specialty",
                "Most ordered Kit",
                "Order value",
                "Rating rate",
              ]}
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="1"
              itemName="Ahmed Saloom"
              type="Lorem Surgery"
              mostOrder="Plates and Secrews "
              orderValue="119$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="2"
              itemName="Mohamed Hamoodi"
              type="Ipsum Surgery"
              mostOrder="Nail System "
              orderValue="230$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="3"
              itemName="Ali Ismail"
              type="Dolor Surgery"
              mostOrder="On pipe "
              orderValue="120$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="4"
              itemName="Ail Hamandi"
              type="Sit Surgery"
              mostOrder="Bone Cement"
              orderValue="121$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="5"
              itemName="Hamdon Mahmood"
              type="Lorem Surgery"
              mostOrder="Bone Substiute"
              orderValue="116$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="6"
              itemName="Murtadha Al-ka'bi"
              type="Ipsum Surgery"
              mostOrder="Plus Lavage "
              orderValue="133$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="7"
              itemName="Mustafa Talib"
              type="Dolor Surgery"
              mostOrder="Knee Spacers"
              orderValue="133$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="8"
              itemName="Bilal Al-Aqidi"
              type="Sit Surgery"
              mostOrder="Hip Spacers "
              orderValue="134$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="9"
              itemName="Hassan Al-Hassani"
              type="Lorem Surgery"
              mostOrder="etc "
              orderValue="135$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="10"
              itemName="Ahmed Saloom"
              type="Lorem Surgery"
              mostOrder="Plates and Secrews "
              orderValue="119$"
              ratingRate="4/5"
            />
            <ListItem
              icon="customerIcon.png"
              itemNumber="11"
              itemName="Mohamed Hamoodi"
              type="Dolor Surgery"
              mostOrder="Nail System "
              orderValue="137$"
              ratingRate="4/5"
            />
            <div className="List_footer">
              <p>the results of your search is 500 items out of 10,000 item </p>
              <div>
                <FontAwesomeIcon icon={faLessThan} className="icon" />
                <p>1/12</p>{" "}
                <FontAwesomeIcon icon={faGreaterThan} className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
