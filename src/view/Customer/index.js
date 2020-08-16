/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "./List_Customer_item.js";
import {
  RejectToast,
  ErrorToast,
  SuccessToast,
} from "../../API/ToastErrorHandle";
// import { Customers } from "../../fakeData";
import {
  loadData,
  addData,
  editData,
  removeItem,
  removeItems,
} from "../../API/";
import { ToastContainer, toast } from "react-toastify";

import ListHead from "../../shared/List//List_head";
import "../../shared/List/index.css";
import CustomerFilter from "./CustomerFilter";
import ListFooter from "../../shared/List/List_footer";
import "../../shared/List/index.css";
import Loader from "react-loader-spinner";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDeleteModal: false,
      Data: [],
      checkedAll: false,
      currentPage: 1,
      pagePerOnce: 4,
      isLoading: true,
      pageNumber: 0,
      Customers: [],
      data: {
        phone: "",
        name: "",
        dgree: "",
        specialty: "",
      },
    };
  }
  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === this.state.Customers.length - 1) {
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
        Data: this.state.Customers,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };

  getData = () => {
    this.setState({ isLoading: true });
    loadData(
      "users",
      (errMsg, data) => {
        if (data.status) {
          this.setState({ isLoading: false });
          // console.log(data, "users");
          for (let i = 0; i < data.users.length; i++) {
            this.setState({ Customers: data.users[0] });
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

  handelEditStuff = (callback) => {
    let id;
    let data = this.state.Data;
    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
    }

    editData(
      "user",
      this.state.data,
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
  handelCreateCustomer = (callback) => {
    this.setState({ isLoading: true });
    addData(
      "user",
      this.state.data,
      (errMsg, data) => {
        this.getData();
        callback();
        this.setState({ isLoading: false });
        if (data.status) {
          SuccessToast("Added Successfully");
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        ErrorToast(errMsg);
      }
    );
  };
  handelInputChange = (event, key) => {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  };
  componentDidMount() {
    if (!localStorage.getItem("step_token")) this.props.history.push("/");
    this.getData();
  }

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
      this.state.Customers.length / this.state.pagePerOnce
    );
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  handelDelete = (callback) => {
    let id;
    let data = this.state.Data;

    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
      removeItem(
        "user",
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
        "users",
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
  render() {
    const listName = "Customer";
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentCustomers = this.state.Customers.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    const totalPageNumber = Math.ceil(
      this.state.Customers.length / this.state.pagePerOnce
    );
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
        <Header slug='Customer list' />
        <div className='container'>
          <CustomerFilter
            handelEditStuff={this.handelEditStuff}
            selectedData={this.state.Data}
            isLoading={this.state.isLoading}
            handelInputChange={this.handelInputChange}
            handelDelete={this.handelDelete}
            handelCreateCustomer={this.handelCreateCustomer}
          />

          <div className='List_Wrapper'>
            <ListHead
              listName='Customer'
              SelectAll={this.SelectAll}
              style='customerItem'
              isLoading={this.state.isLoading}
              checkedAll={this.state.checkedAll}
              fieldsName={[
                "Phone Number",
                "Specialty",
                "Degree",
                "Most ordered Kit",
                "Order value",
                "Rating rate",
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
                {CurrentCustomers.map((item, i) => {
                  return (
                    <ListItem
                      listName='customer'
                      style='customerItem'
                      itemName={item.name}
                      className={
                        this.isSelected(item.id)
                          ? "List_item selected_Item"
                          : "List_item"
                      }
                      itemNumber={i + 1}
                      specialty={item.specialty}
                      degree={item.dgree}
                      phone={item.phone}
                      mostOrder={item.needOtp == null ? 0 : item.needOtp}
                      orderValue={item.orderValue == null ? 0 : item.orderValue}
                      ratingRate={item.ratingRate == null ? 0 : item.ratingRate}
                      onChange={(e) => this.checked(e, item)}
                      checked={this.isSelected(item.id) ? true : ""}
                    />
                  );
                })}
              </div>
            )}
            <ListFooter
              currentPage={this.state.currentPage}
              searchResult={this.state.Customers.length}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              totalPageNumber={totalPageNumber}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
