/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import ListItem from "./List_Customer_item.js";

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
    loadData("users", (errorMsg, data) => {
      if (data) {
        this.setState({ isLoading: false });
        for (let i = 0; i < data.users.length; i++) {
          this.setState({ Customers: data.users[0] });
        }
      } else {
        toast("fetch failed  ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
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
    console.log("edited");
    editData("user", this.state.data, id, () => {
      console.log(this.state.data, id, "should be edited");
      this.setState({ isLoading: false, Data: [] });
      toast(
        `
      Edited Successfully `,
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
  handelCreateCustomer = (callback) => {
    this.setState({ isLoading: true });
    console.log(this.state.data, "uplaoded data");
    addData("user", this.state.data, () => {
      this.getData();
      this.setState({ isLoading: false });
      toast("Add Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    });
    callback();
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
      removeItem("user", id, () => {
        this.setState({ isLoading: false, Data: [] });
        this.getData();
        toast(
          `
         Deleted Successfully `,
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
        callback();
      });
    } else {
      id = data.map((i) => i.id);
      console.log(id, "deleted");
      removeItems("users", { ids: id }, () => {
        this.setState({ isLoading: false, Data: [] });
        toast(
          `
         Deleted Successfully `,
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
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
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
