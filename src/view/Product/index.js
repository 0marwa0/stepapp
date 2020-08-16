/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import ListFooter from "../../shared/List/List_footer";
import Loader from "react-loader-spinner";

import Header from "../../shared/header";
import "../../shared/List/index.css";

import "../../App.css";
import "./index.css";
import ProductFilter from "./ProductFilter";

import "../../shared/List/index.css";
import CreateProduct from "./CreateProduct";
import EditProduct from "./CreateProduct/EditProduct";
import Modal from "../../shared/Modal";
import { Products } from "../../fakeData/";

import ListItem from "../../shared/List/List_Item";
import "../../App.css";
import API from "../../API/index";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";

import {
  ResponseToast,
  ResponseToastMsg,
  RejectToast,
  // ErrorToast,
  SuccessToast,
} from "../../API/ToastErrorHandle";
// import { Customers } from "../../fakeData";
import {
  loadData,
  editData,
  addData,
  removeItem,
  removeItems,
} from "../../API/";
import UploadImage from "././CreateProduct/UploadImage";
import ListHead from "../../shared/List//List_head";
import ListType_item from "./ListType_item";
import SideNav from "../../shared/SideModel/index.js";
import Category from "../../API/middleware/Category";
import SubGroup from "../../API/middleware/SubGroup";
import Group from "../../API/middleware/Groups";
const ErrorToast = (error) => {
  let message;
  for (var key in error) {
    message = error[key];
  }
  toast(
    ` 
      ❌
    
    ${message}`,
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
};

export default class index extends React.Component {
  state = {
    showModel: false,
    showUploadModel: false,
    showEditModel: false,
    list: true,
    burger: false,
    showModel: false,
    Data: [],
    checkedAll: false,
    currentPage: 1,
    pagePerOnce: 4,
    isLoadingData: true,
    isLoading: true,
    pageNumber: 0,
    Products: [],
    showSideNav: false,
    category: [],
    groups: [],
    subgroups: [],
    components: [],
    data: {
      name: "",
      image: "",
      description: "",
      price: 0,
      subgroup: "",
      components: "",
    },

    isActive: false,
    Image: require("../../shared/Icon/upload.png"),
    allowToChange: false,
  };

  checked = (e, item) => {
    if (e.target.checked) {
      this.setState({
        Data: this.state.Data.concat([item]),
      });
      if (this.state.Data.length === this.state.Products.length - 1) {
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
        Data: this.state.Products,
        checkedAll: true,
      });
    } else {
      this.setState({
        Data: [],
        checkedAll: false,
      });
    }
  };

  DisplayModel = (showModel) => {
    this.setState({ showModel });
  };
  DisplayUploadModel = (showUploadModel) => {
    this.setState({ showUploadModel });
  };
  DisplayEditModel = (showEditModel) => {
    this.setState({ showEditModel });
  };

  DisplaySideNav = (showSideNav) => {
    this.setState({ showSideNav });
  };
  listActive = (list) => {
    this.setState({ list });
  };
  burgerActive = (burger) => {
    this.setState({ burger });
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
      this.state.Products.length / this.state.pagePerOnce
    );
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };
  handleImageChange = (event, key) => {
    let value = event.target.files[0];
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    let data = this.state.data;
    this.setState({
      Image: imgSrc,
      allowToChange: true,
    });
    data[
      key
    ] = `${event.target.files[0]}/C:/Users/Marwa/Desktop/FoodApp/food_app/src/Images/berries.png`;

    // console.log(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      // data[key] = reader.result;
    };
    this.setState({ data });
  };
  removeImage = () => {
    this.setState({
      Image: require("../../shared/Icon/upload.png"),
      allowToChange: false,
    });
  };

  Active = (isActive) => {
    this.setState({ isActive });
  };
  getData = () => {
    this.setState({ isLoading: true });
    loadData(
      "products",
      (errMsg, data) => {
        if (data.status) {
          this.setState({ isLoading: false });
          // console.log(data, "products");
          for (let i = 0; i < data.products.length; i++) {
            this.setState({ Products: data.products[0] });
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
    loadData(
      "categories",
      (errMsg, data) => {
        if (data.status) {
          // console.log(data, "categories");
          for (let i = 0; i < data.categories.length; i++) {
            this.setState({ categories: data.categories[0] });
          }
        } else {
          RejectToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
    loadData(
      "groups",
      (errMsg, data) => {
        if (data.status) {
          // console.log(data, "groups");
          for (let i = 0; i < data.groups.length; i++) {
            this.setState({ groups: data.groups[0] });
          }
        } else {
          RejectToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
    loadData(
      "subgroups",
      (errMsg, data) => {
        if (data.status) {
          // console.log(data, "subgroups");
          for (let i = 0; i < data.subgroups.length; i++) {
            this.setState({ subgroups: data.subgroups[0] });
          }
        } else {
          RejectToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
    loadData(
      "components",
      (errMsg, data) => {
        if (data.status) {
          // console.log(data, "components");
          for (let i = 0; i < data.components.length; i++) {
            this.setState({ components: data.components[0] });
          }
        } else {
          RejectToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  }

  handelCreateProduct = (callback) => {
    // console.log(this.state.data, "product data");
    this.setState({ isLoading: true });

    addData(
      "product",
      this.state.data,
      (errMsg, data) => {
        callback();
        this.setState({ isLoading: false });
        if (data.status) {
          SuccessToast("Added Successfully");
          this.getData();
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  handelInputChange = (event, key) => {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  };
  handleSelect = (event, key) => {
    let value = event.value;
    let data = this.state.data[key];
    data = value;
    this.setState({ data });
    console.log(event, data, "selected value");
  };
  handelEditProduct = (callback) => {
    let id;
    let data = this.state.Data;
    this.setState({ isLoading: true });
    if (data.length === 1) {
      data.map((i) => (id = i.id));
    }

    editData(
      "product",
      this.state.data,
      id,
      (errMsg, data) => {
        this.setState({ isLoading: false, Data: [] });

        callback();
        this.setState({ isLoading: false });
        if (data.status) {
          SuccessToast("Edited Successfully");
          this.getData();
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
        "product",
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
        "products",
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
    const ListName = "product";
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const CurrentProducts = this.state.Products.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    const totalPageNumber = Math.ceil(
      this.state.Products.length / this.state.pagePerOnce
    );
    // console.log(CurrentProducts, "current product");
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
        <Header
          slug='Products List'
          DisplaySideNav={() => this.DisplaySideNav(true)}
        />
        <div className='container'>
          <ListFilter
            selectedData={this.state.Data}
            showModal={() => this.DisplayModel(true)}
            ListName='product'
            list={this.state.list}
            handelDelete={this.handelDelete}
            burger={this.state.burger}
            isLoading={this.state.isLoading}
            listActive={this.listActive}
            burgerActive={this.burgerActive}
            DisplayUploadModel={() => this.DisplayUploadModel(true)}
            DisplayEditModel={() => this.DisplayEditModel(true)}>
            {this.state.list ? (
              <div>
                <div className='List_Wrapper'>
                  <ListHead
                    listName='Product'
                    SelectAll={this.SelectAll}
                    checkedAll={this.state.checkedAll}
                    style='productItem'
                    fieldsName={[
                      "3rd stage category",
                      "2nd stage category",
                      "1st stage category",
                      "Price",
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
                      {CurrentProducts.map((item, i) => {
                        return (
                          <ListItem
                            listName='product'
                            itemName={item.name}
                            style='productItem'
                            className={
                              this.isSelected(item.id)
                                ? "List_item selected_Item"
                                : "List_item"
                            }
                            itemNumber={i + 1}
                            type={item.subgroup["name"]}
                            mostOrder={item.subgroup["group"].name}
                            orderValue={item.subgroup["group"].category["name"]}
                            price={item.price + "$"}
                            onChange={(e) => this.checked(e, item)}
                            checked={this.isSelected(item.id) ? true : ""}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <ListFooter
                  currentPage={this.state.currentPage}
                  searchResult={this.state.Products.length}
                  prevPage={this.prevPage}
                  nextPage={this.nextPage}
                  totalPageNumber={totalPageNumber}
                />
              </div>
            ) : (
              <div className='ListType_2_wrapper'>
                {this.state.Products.map((item, i) => {
                  return (
                    <ListType_item
                      name={item.name}
                      group={item.subgroup["group"].name}
                      category={item.subgroup["group"].category["name"]}
                      price={item.price + "$"}
                    />
                  );
                })}
              </div>
            )}
          </ListFilter>

          {this.state.showModel ? (
            <Modal
              modalButton='Create New Item'
              modalPurpose='From here you can add this.state.Products to your list'
              modalTitle='Add new Product'
              width='50%'
              height='100%'
              size='lg'
              fun={this.handelCreateProduct}
              onCLose={() => this.DisplayModel(false)}>
              <CreateProduct
                groups={this.state.groups}
                subgroups={this.state.subgroups}
                categories={this.state.category}
                components={this.state.components}
                handleSelect={this.handleSelect}
                handelInputChange={this.handelInputChange}
                Active={this.Active}
                data={this.state.Data}
                isActive={this.state.isActive}
                Image={this.state.Image}
                removeImage={this.removeImage}
                handleImageChange={this.handleImageChange}
                allowToChange={this.state.allowToChange}
              />
            </Modal>
          ) : null}
          {this.state.showEditModel ? (
            <Modal
              modalButton='Save Edit'
              modalPurpose=''
              modalTitle='Edit product'
              width='50%'
              height='55%'
              fun={this.handelEditProduct}
              onCLose={() => this.DisplayEditModel(false)}>
              <EditProduct
                data={this.state.Data}
                handelInputChange={this.handelInputChange}
              />
            </Modal>
          ) : null}
          {this.state.showUploadModel ? (
            <Modal
              // isMulti={true}
              modalButton='Save Edit'
              modalPurpose=''
              modalTitle='Change image'
              width='50%'
              height='70%'
              // onBack={() => {
              //   DisplayModel(true);
              //   DisplayUploadModel(false);
              // }}
              onCLose={() => this.DisplayUploadModel(false)}>
              <UploadImage
                Active={this.Active}
                isActive={this.state.isActive}
                Image={this.state.Image}
                removeImage={this.removeImage}
                handleImageChange={this.handleImageChange}
                allowToChange={this.state.allowToChange}
              />
            </Modal>
          ) : null}
          {this.state.showSideNav && (
            <SideNav
              categories={this.state.categories}
              groups={this.state.groups}
              subgroups={this.state.subgroups}
              deleteItem={this.deleteItem}
              isLoading={this.state.isLoading}
              DisplaySideNav={this.DisplaySideNav}
            />
          )}
        </div>
      </div>
    );
  }
}
