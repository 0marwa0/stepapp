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
import ListFooter from "../../shared/List/List_footer";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
      currentPage: 1,
      pagePerOnce: 4,
      isLoading: false,
      pageNumber: 0,
    };
  }
  ShowEditModal = (showEditModal) => {
    this.setState({ showEditModal });
  };
  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === Stuff.length - 1) {
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
        Data: Stuff,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };
  prevPage = () => {
    const currentPage = this.state.currentPage;
    if (currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    const currentPage = this.state.currentPage;
    const totalPge = Math.ceil(Stuff.length / this.state.pagePerOnce);
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };
  render() {
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentStuff = Stuff.slice(indexOfFirstPage, indexOfLastPage);
    const totalPageNumber = Math.ceil(Stuff.length / this.state.pagePerOnce);
    return (
      <div>
        <Header slug='Stuff list' />
        <div className='container'>
          <StuffFilter selectedData={this.state.Data} />
          <div className='List_Wrapper'>
            <ListHead
              listName='Stuff'
              SelectAll={this.SelectAll}
              checkedAll={this.state.checkedAll}
              fieldsName={[
                "Team",
                "Most claimed task",
                "Number of tasks",
                "Rating rate",
              ]}
            />
            {CurrentStuff.map((item, i) => {
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
                  showModal={() => this.ShowEditModal(true)}
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
              searchResult={Stuff.length}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              totalPageNumber={totalPageNumber}
            />

            {/* <div className='List_footer'>
              <p>
                the results of your search is {Stuff.length} items out of{" "}
                {Stuff.length} item{" "}
              </p>
              <div>
                <FontAwesomeIcon icon={faLessThan} className='icon' />
                <p>1/1</p>{" "}
                <FontAwesomeIcon icon={faGreaterThan} className='icon' />
              </div>
            </div> */}
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
