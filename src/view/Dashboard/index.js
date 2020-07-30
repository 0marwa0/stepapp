import React, { Component } from "react";
import Card from "../../shared/Card/Card";
import NotificationCtrl from "../../shared/NotificationCtrl";
import { Link } from "react-router-dom";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="cards_container">
          <Link to="/Home/ProductList">
            <Card
              icon="cardIcon1.png"
              cardName="Products list"
              cardInfo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis  blanditiis ."
              btnName="Add new product"
            />
          </Link>
          <Link to="/Home/CustomerList">
            <Card
              icon="cardIcon2.png"
              cardName="Customer list"
              cardInfo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis  blanditiis "
              btnName="Add new customer"
            />
          </Link>
          <Link to="/Home/StuffList">
            <Card
              icon="cardIcon3.png"
              cardName="Stuff list"
              cardInfo="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis blanditiis."
              btnName="Add new employee"
            />
          </Link>
        </div>
        <div className="Notification_container">
          <NotificationCtrl
            icon="order.png"
            number="100"
            label="Order for this week"
          />
          <NotificationCtrl
            icon="finished.png"
            number="67"
            label="Finished orders this week"
          />
          <NotificationCtrl
            icon="absence.png"
            number="500 hrs."
            label="This week absence time"
          />
          <NotificationCtrl
            icon="notification.png"
            number="100,000"
            label="notification this week"
          />
          <NotificationCtrl
            icon="hospitals.png"
            number="20"
            label="New hospitals this week"
          />
          <NotificationCtrl
            icon="newCustomers.png"
            number="100"
            label="New customers this week"
          />
          <NotificationCtrl
            icon="soldItem.png"
            number="500"
            label="Total sold items this week"
          />
        </div>
      </div>
    );
  }
}

export default index;
