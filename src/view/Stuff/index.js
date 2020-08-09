/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "./List_stuff_item.js";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Stuff } from "../../fakeData";
import ListHead from "../../shared/List/List_head";
import "../../shared/List/index.css";
import StuffFilter from "./StuffFilter";
import EditPassword from "./EditPassword";
import Modal from "../../shared/Modal";
import ListFooter from "../../shared/List/List_footer";
import EditStuff from "./EditStuff";
import API from "../../API/index";
import Loader from "react-loader-spinner";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPassword: false,
      DisplayEditModel: false,
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
      currentPage: 1,
      pagePerOnce: 4,
      isLoading: false,
      pageNumber: 0,
      Stuff: [],
      isLoading: true,
    };
  }
  showEditPassword = (showEditPassword) => {
    this.setState({ showEditPassword });
  };
  DisplayEditModel = (DisplayEditModel) => {
    this.setState({ DisplayEditModel });
  };
  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === this.state.Stuff.length - 1) {
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
        Data: this.state.Stuff,
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
    const totalPge = Math.ceil(
      this.state.Stuff.length / this.state.pagePerOnce
    );
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };
  componentDidMount() {
    API.getStuff((data) => {
      console.log(data);
      if (data) {
        this.setState({ isLoading: false });
      }
      for (let i = 0; i < data.admins.length; i++) {
        this.setState({ Stuff: data.admins[0] });
        console.log(data.admins[0].map((i) => i));
      }
    });
  }
  render() {
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentStuff = this.state.Stuff.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    const totalPageNumber = Math.ceil(
      this.state.Stuff.length / this.state.pagePerOnce
    );
    console.log(new Date(), "what kind of date");
    return (
      <div>
        <Header slug='Stuff list' />
        <div className='container'>
          <StuffFilter
            selectedData={this.state.Data}
            DisplayEditModel={() => this.DisplayEditModel(true)}
          />
          <div className='List_Wrapper'>
            <ListHead
              listName='Stuff'
              SelectAll={this.SelectAll}
              style='stuffItem'
              checkedAll={this.state.checkedAll}
              fieldsName={[
                "Email",
                "Phone Number",
                "Birthday",
                "Team",
                "Location",
              ]}
            />
            {this.state.isLoading ? (
              <div className='loader_wrapper'>
                <Loader
                  type='ThreeDots'
                  color='var(--blue)'
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <div>
                {CurrentStuff.map((item, i) => {
                  return (
                    <ListItem
                      listName='stuff'
                      style='stuffItem'
                      itemName={item.name}
                      className={
                        this.isSelected(item.id)
                          ? "List_item selected_Item"
                          : "List_item"
                      }
                      itemNumber={i + 1}
                      email={item.email}
                      showModal={() => this.showEditPassword(true)}
                      phone={item.phone}
                      birthday={item.birthday.slice(0, 4)}
                      location={item.location}
                      team={item.type}
                      onChange={(e) => this.checked(e, item)}
                      checked={this.isSelected(item.id) ? true : ""}
                    />
                  );
                })}
              </div>
            )}
            <ListFooter
              currentPage={this.state.currentPage}
              searchResult={this.state.Stuff.length}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              totalPageNumber={totalPageNumber}
            />
          </div>{" "}
          {this.state.showEditPassword ? (
            <Modal
              modalButton='Re-new password'
              modalPurpose=' '
              modalTitle='Re-new password'
              width='40%'
              height='55%'
              onCLose={() => this.showEditPassword(false)}>
              <EditPassword />
            </Modal>
          ) : null}
          {this.state.DisplayEditModel ? (
            <Modal
              modalButton='Save edit'
              modalPurpose=' '
              modalTitle='Edit team member'
              width='50%'
              height='60%'
              onCLose={() => this.DisplayEditModel(false)}>
              <EditStuff />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default index;
