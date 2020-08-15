/** @format */

import React, { Component } from "react";
import Card from "../../shared/Card/Card";
import NotificationCtrl from "../../shared/NotificationCtrl";
import { Link } from "react-router-dom";
import Tost from "../../shared/Tost";
import { ToastContainer, toast } from "react-toastify";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = { showTost: false };
  }
  componentDidMount() {
    console.log(this.props.isLogin);
    if (!localStorage.getItem("step_token")) this.props.history.push("/");
  }
  render() {
    // const showTost =
    //   this.props.location.state.show === "show" ? <Tost /> : null;

    return (
      <div>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='container'>
          <div className='cards_container'>
            <Link to='/productlist'>
              <Card
                icon='cardIcon1.png'
                cardName='Products list'
                cardInfo='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis  blanditiis .'
                btnName='Add new product'
              />
            </Link>
            <Link to='/customerlist'>
              <Card
                icon='cardIcon2.png'
                cardName='Customer list'
                cardInfo='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis  blanditiis '
                btnName='Add new customer'
              />
            </Link>
            <Link to='/stufflist'>
              <Card
                icon='cardIcon3.png'
                cardName='Stuff list'
                cardInfo='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                        voluptatibus minima fuga blanditiis blanditiis.'
                btnName='Add new employee'
              />
            </Link>
          </div>
          <div className='Notification_Container'>
            <NotificationCtrl
              icon='order.png'
              number='100'
              label='Order for this week'
            />
            <NotificationCtrl
              icon='finished.png'
              number='67'
              label='Finished orders this week'
            />
            <NotificationCtrl
              icon='absence.png'
              number='500 hrs.'
              label='This week absence time'
            />
            <NotificationCtrl
              icon='notification.png'
              number='100,000'
              label='notification this week'
            />
            <NotificationCtrl
              icon='hospitals.png'
              number='20'
              label='New hospitals this week'
            />
            <NotificationCtrl
              icon='newCustomers.png'
              number='100'
              label='New customers this week'
            />
            <NotificationCtrl
              icon='soldItem.png'
              number='500'
              label='Total sold items this week'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
