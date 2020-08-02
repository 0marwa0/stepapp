/** @format */

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
import StuffFilter from "./StuffFilter";
import EditPassword from "./EditPassword";
import Modal from "../../shared/Modal";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = { showEditModal: false };
  }
  ShowEditModal = (showEditModal) => {
    this.setState({ showEditModal });
    console.log("ffffffffffffffffffffack");
  };
  render() {
    return (
      <div>
        <Header slug='Stuff list' />
        <div className='container'>
          <StuffFilter />
          <div className='List_Wrapper'>
            <ListHead
              listName='Stuff'
              fieldsName={[
                "Team",
                "Most claimed task",
                "Number of tasks",
                "Rating rate",
              ]}
            />
            <ListItem
              icon='stuffIcon.png'
              itemName='Ahmed Saloom'
              itemNumber='1'
              type='Lorem '
              mostOrder='Plates and Secrews '
              orderValue='119'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='2'
              itemName='Mohamed Hamoodi'
              type='Ipsum'
              mostOrder='Nail System '
              orderValue='230'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='3'
              itemName='Ali Ismail'
              type='Dolor '
              mostOrder='On pipe '
              orderValue='120'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='4'
              itemName='Ail Hamandi'
              type='Sit '
              mostOrder='Bone Cement'
              orderValue='121'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='5'
              itemName='Hamdon Mahmood'
              type='Lorem '
              mostOrder='Bone Substiute'
              orderValue='116'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='6'
              itemName="Murtadha Al-ka'bi"
              type='Ipsum '
              mostOrder='Plus Lavage '
              orderValue='133'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='7'
              itemName='Mustafa Talib'
              type='Dolor '
              mostOrder='Knee Spacers'
              orderValue='133'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='8'
              itemName='Bilal Al-Aqidi'
              type='Sit '
              mostOrder='Hip Spacers '
              orderValue='134'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='9'
              itemName='Hassan Al-Hassani'
              type='Lorem '
              mostOrder='etc '
              orderValue='135'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='10'
              itemName='Ahmed Saloom'
              type='Lorem'
              mostOrder='Plates and Secrews '
              orderValue='119'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <ListItem
              icon='stuffIcon.png'
              itemNumber='11'
              itemName='Mohamed Hamoodi'
              type='Dolor'
              mostOrder='Nail System '
              orderValue='137'
              ratingRate='4/5'
              showModal={this.ShowEditModal}
            />
            <div className='List_footer'>
              <p>the results of your search is 500 items out of 10,000 item </p>
              <div>
                <FontAwesomeIcon icon={faLessThan} className='icon' />
                <p>1/12</p>{" "}
                <FontAwesomeIcon icon={faGreaterThan} className='icon' />
              </div>
            </div>
          </div>{" "}
          {this.state.showEditModal ? (
            <Modal
              modalButton='Re-new password'
              modalPurpose=' '
              modalTitle='Re-new password'
              width='45%'
              height='50%'
              onCLose={() => this.ShowEditModal(false)}>
              <EditPassword />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default index;
