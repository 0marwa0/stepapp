import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "../../shared/List/List_Item";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLessThan,
  faUnlockAlt,
} from "@fortawesome/fontawesome-free-solid";

import ListHead from "../../shared/List//List_head";

import "../../shared/List/index.css";

import ProductFilter from "./ProductFilter";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header slug="Products List" />
        <div className="container">
          <ProductFilter />
          <div className="List_Wrapper">
            <ListHead
              listName="Product"
              fieldsName={[
                "3rd stage category",
                "2nd stage category",
                "1st stage category",
                "Price",
              ]}
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="S type clavical locking plate"
              itemNumber="1"
              type="Lorem "
              mostOrder="Plates and Secrews "
              orderValue="Trauma"
              ratingRate="119$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="S type clavical locking plate-||"
              itemNumber="2"
              type="Ipsum "
              mostOrder="Nail System "
              orderValue="Athtoplsty"
              ratingRate="230$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Distal type clavical locking plate"
              itemNumber="3"
              type="Dolor "
              mostOrder="On pipe "
              orderValue="Others"
              ratingRate="120$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Distal type clavical locking plate"
              itemNumber="4"
              type="Sit "
              mostOrder="Bone Cement"
              orderValue="Trauma"
              ratingRate="121$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Humerus loking plate"
              itemNumber="5"
              type="Lorem "
              mostOrder="Bone Substiute"
              orderValue="Arthroplasty"
              ratingRate="116$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="proximal Humerus Condylus locking plate-||"
              itemNumber="6"
              type="Ipsum "
              mostOrder="Plus Lavage "
              orderValue="Others"
              ratingRate="123$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="proximal Humerus lateral locking plate-||"
              itemNumber="7"
              type="Dolor "
              mostOrder="Knee Spacers"
              orderValue="Trauma"
              ratingRate="133$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Disttal Humerus Candylus locking plate"
              itemNumber="8"
              type="Sit "
              mostOrder="Hip Spacers "
              orderValue="Arthroplasty"
              ratingRate="134$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Disttal Humerus medial locking plate"
              itemNumber="9"
              type="Lorem "
              mostOrder="etc "
              orderValue="Others"
              ratingRate="136$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Disttal Humerus sub-conduls locking plate"
              itemNumber="10"
              type="Lorem"
              mostOrder="Plates and Secrews "
              orderValue="Trauma"
              ratingRate="137$"
            />
            <ListItem
              icon="productIcon.png"
              listName="product"
              itemName="Y-type Humerus Candlus locking plate"
              itemNumber="11"
              type="Dolor"
              mostOrder="Nail System "
              orderValue="Arthroplasty"
              ratingRate="135$"
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
