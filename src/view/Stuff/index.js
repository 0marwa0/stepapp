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
import { Stuff } from "../../fakeData";
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
  };
  render() {
    return (
      <div>
        <Header slug='Stuff list' />
        <div className='container'>
          <StuffFilter selectedData={[]} />
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
            {Stuff.map((item, i) => {
              return (
                <ListItem
                  itemName={item.itemName}
                  itemNumber={i + 1}
                  type={item.type}
                  mostOrder={item.mostOrder}
                  orderValue={item.orderValue}
                  ratingRate={item.ratingRate}
                  showModal={this.ShowEditModal}
                />
              );
            })}

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
