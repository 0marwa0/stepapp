/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "./List_stuff_item.js";
import "../../App.css";
// import { Stuff } from "../../fakeData";
import ListHead from "../../shared/List/List_head";
import "../../shared/List/index.css";
import StuffFilter from "./StuffFilter";
import EditPassword from "./EditPassword";
import Modal from "../../shared/Modal";
import ListFooter from "../../shared/List/List_footer";
import EditStuff from "./EditStuff";
import API, { addData } from "../../API/index";
import Loader from "react-loader-spinner";
import { loadData, editData, removeItem, removeItems } from "../../API/";
import { ToastContainer, toast } from "react-toastify";
import {
  RejectToast,
  ErrorToast,
  SuccessToast,
} from "../../API/ToastErrorHandle";
import Stuff from "../../API/middleware/Stuff/index";
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
      data: {
        name: "",
        phone: "",
        email: "",
        password: "",
        location: "",
        birthday: "",
        type: "pd",
      },
      editedData: {
        name: "",
        phone: "",
        email: "",
        location: "",
        birthday: "",
        type: "pd",
      },
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
  getData = () => {
    this.setState({ isLoading: true });
    loadData(
      "admins",
      (errMsg, data) => {
        if (data.status) {
          this.setState({ isLoading: false });
          console.log(data, "admin");
          for (let i = 0; i < data.admins.length; i++) {
            this.setState({ Stuff: data.admins[0] });
          }
        } else {
          RejectToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  componentDidMount() {
    if (!localStorage.getItem("step_token")) this.props.history.push("/");
    this.getData();
  }
  handelInputChange = (event, key) => {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  };
  handelEditChange = (event, key) => {
    let value = event.target.value;
    let editedData = this.state.editedData;
    editedData[key] = value;
    this.setState({ editedData });
  };
  handelCreateStuff = (callback) => {
    this.setState({ isLoading: true });
    addData("admin", this.state.data, (errMsg, data) => {
      this.getData();
      callback();
      this.setState({ isLoading: false });
      if (data.status) {
        SuccessToast("Added Successfully");
      } else {
        ErrorToast(errMsg);
      }
    });
  };
  handelEditStuff = (callback) => {
    let id;
    let data = this.state.Data;
    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
    }

    editData(
      "admin",
      this.state.editedData,
      id,
      (errMsg, data) => {
        this.setState({ isLoading: false, Data: [] });

        this.getData();
        callback();
        this.setState({ isLoading: false });
        if (data.status) {
          SuccessToast("Edited Successfully");
        } else {
          ErrorToast(errMsg);
        }
      },

      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };

  handelDelete = (callback) => {
    let id;
    let data = this.state.Data;

    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
      removeItem(
        "admin",
        id,
        (errMsg, data) => {
          this.setState({ isLoading: false, Data: [] });
          this.getData();
          callback();
          this.setState({
            isLoading: false,
          });
          if (data.status) {
            SuccessToast("Deleted Successfully");
          } else {
            ErrorToast(errMsg);
          }
        },
        (errMsg) => {
          RejectToast(errMsg);
        }
      );
    } else {
      id = data.map((i) => i.id);
      removeItems(
        "admins",
        { ids: id },
        (errMsg, data) => {
          this.setState({ isLoading: false, Data: [] });
          this.getData();
          callback();
          this.setState({
            isLoading: false,
          });
          if (data.status) {
            SuccessToast("Deleted Successfully");
          } else {
            ErrorToast(errMsg);
          }
        },
        (errMsg) => {
          RejectToast(errMsg);
        }
      );
    }
  };
  handelEditPassword = (callback) => {
    let id;
    let data = this.state.Data;
    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
    }

    editData("admin", this.state.data, id, () => {
      this.setState({ isLoading: false, Data: [] });
      toast(
        `
      Password changed Successfully `,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      this.getData();
      callback();
    });
  };

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
    // let editableData = ;
    return (
      <div>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          newestOnTop={true}
          closeButton={false}
          toastClassName='tostStyle'
          pauseOnFocusLoss
          draggable
          rtl={false}
          pauseOnHover
        />
        <Header slug='Stuff list' />
        <div className='container'>
          <StuffFilter
            selectedData={this.state.Data}
            isLoading={this.state.isLoading}
            handelDelete={this.handelDelete}
            handelInputChange={this.handelInputChange}
            handelCreateStuff={this.handelCreateStuff}
            DisplayEditModel={() => this.DisplayEditModel(true)}
          />
          <div className='List_Wrapper'>
            <ListHead
              listName='Stuff'
              SelectAll={this.SelectAll}
              isLoading={this.state.isLoading}
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
                      key={i}
                      listName='stuff'
                      style='stuffItem'
                      isLoading={this.state.isLoading}
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
              fun={this.handelEditPassword}
              onCLose={() => this.showEditPassword(false)}>
              <EditPassword
                data={this.state.Data}
                handelInputChange={this.handelInputChange}
              />
            </Modal>
          ) : null}
          {this.state.DisplayEditModel ? (
            <Modal
              modalButton='Save edit'
              modalPurpose=' '
              modalTitle='Edit team member'
              width='50%'
              height='60%'
              fun={this.handelEditStuff}
              onCLose={() => this.DisplayEditModel(false)}>
              <EditStuff
                data={this.state.Data}
                handelInputChange={this.handelEditChange}
              />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default index;
