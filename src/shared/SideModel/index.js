/** @format */

import React from "react";
import Select from "react-select";
import "./index.css";
import "../../App.css";
import Group from "../../API/middleware/Groups";
import Category from "../../API/middleware/Category";
import SubGroup from "../../API/middleware/SubGroup";
import { FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

import Loader from "react-loader-spinner";
import { removeItem, loadData } from "../../API/index";
import {
  ResponseToast,
  ResponseToastMsg,
  RejectToast,
  ErrorToast,
  SuccessToast,
} from "../../API/ToastErrorHandle";
const options = [
  { value: "categories", label: "Main Category" },
  { value: "groups", label: "Group" },
  { value: "subgroups", label: "Sub Group" },
];
class index extends React.Component {
  state = {
    selectValue: { value: "categories", label: " Main Category" },
    groups: [],
    subgroups: [],
    categories: [],
    isLoading: true,
  };
  onChange = (event) => {
    this.setState({ selectValue: event });
  };

  deleteItem = (id, value) => {
    this.setState({ isLoading: true });
    switch (value) {
      case "categories":
        removeItem(
          "category",
          id,
          (errMsg, data) => {
            // this.setState({ isLoading: false });
            this.getCategories();
            // callback();
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

        break;
      case "groups":
        removeItem(
          "group",
          id,
          (errMsg, data) => {
            // this.setState({ isLoading: false });
            this.getGroups();
            // callback();
            this.setState({
              isLoading: false,
            });
            if (data.status) {
              console.log(data, "delete item ipe");
              SuccessToast("Deleted Successfully");
            } else {
              ErrorToast(errMsg);
            }
          },
          (errMsg) => {
            RejectToast(errMsg);
          }
        );
        break;
      case "subgroups":
        removeItem(
          "subgroup",
          id,
          (errMsg, data) => {
            // this.setState({ isLoading: false });
            this.getSubgroups();
            // callback();
            this.setState({
              isLoading: false,
            });
            if (data.status) {
              console.log(data, "delete item ipe");
              SuccessToast("Deleted Successfully");
            } else {
              ErrorToast(errMsg);
            }
          },
          (errMsg) => {
            RejectToast(errMsg);
          }
        );
        break;
      default:
        break;
    }
  };
  Display = (value) => {
    if (value == "categories") {
      return this.state.isLoading ? (
        <div className='sideNavLoader'>
          <Loader type='ThreeDots' color='blue' height={80} width={80} />
        </div>
      ) : (
        this.state.categories.map((item) => (
          <div className='sideNav_item'>
            <p>{item.name}</p>
            <FiTrash
              color='red'
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteItem(item.id, value)}
            />
          </div>
        ))
      );
    }

    if (value == "groups") {
      return this.state.isLoading ? (
        <div className='sideNavLoader'>
          <Loader type='ThreeDots' color='blue' height={80} width={80} />
        </div>
      ) : (
        this.state.groups.map((item) => (
          <div className='sideNav_item'>
            <p>{item.name}</p>
            <FiTrash
              color='red'
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteItem(item.id, value)}
            />
          </div>
        ))
      );
    }
    if (value == "subgroups") {
      return this.state.isLoading ? (
        <div className='sideNavLoader'>
          <Loader type='ThreeDots' color='blue' height={80} width={80} />
        </div>
      ) : (
        this.state.subgroups.map((item) => (
          <div className='sideNav_item'>
            <p>{item.name}</p>
            <FiTrash
              color='red'
              style={{ cursor: "pointer" }}
              onClick={() => this.deleteItem(item.id, value)}
            />
          </div>
        ))
      );
    }
  };
  handleClose = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.DisplaySideNav(false);
  };
  getGroups = () => {
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
  };

  getSubgroups = () => {
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
  };

  loader = () => (
    <div className='sideNavLoader'>
      <Loader type='ThreeDots' color='blue' height={80} width={80} />
    </div>
  );
  getCategories = () => {
    loadData(
      "categories",
      (errMsg, data) => {
        if (data.status) {
          // console.log(data, "categories");
          this.setState({ isLoading: false });
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
  };
  componentDidMount() {
    this.getGroups();
    this.getSubgroups();
    this.getCategories();
  }
  render() {
    let customStyles = {
      menu: (styles) => ({ ...styles, width: "9em", borderRadius: 6 }),

      option: (provided, state) => ({
        ...provided,
        "&:hover": {
          backgroundColor: state.isSelected
            ? "rgb(230, 247, 255)"
            : "var(--lighter-gray)",
        },
        width: "100%",
        // height: "1.5em",
        fontSize: "14px",
        color: "black",
        backgroundColor: state.isSelected ? "rgb(230, 247, 255)" : "",

        padding: 10,
      }),
      control: () => ({
        width: "10em",
        display: "flex",
        cursor: "pointer",
        fontSize: "14px",
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "all 300ms";

        return { ...provided, opacity, transition };
      },
    };

    return (
      <div onClick={(e) => this.handleClose(e)} className='SideOverlay'>
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
        <div
          className={this.props.isLoading ? "SideModal loading" : "SideModal"}
          ref={(node) => {
            this.node = node;
          }}>
          <div className='Modal_inner_header'>
            <Select
              options={options}
              defaultValue='Main Group'
              value={this.state.selectValue}
              styles={customStyles}
              onChange={this.onChange}
              components={{
                IndicatorSeparator: () => null,
              }}
            />

            <div className='input_wrapper'>
              <div>
                <input type='text' placeholder='Search for something ...' />

                {this.props.isLoading ? (
                  <div className='input_icon'>
                    <Loader type='Oval' color='black' height={15} width={15} />
                  </div>
                ) : (
                  <img
                    src={require("../../shared/Icon/searchIcon.png")}
                    height='13px'
                    className='input_icon'
                  />
                )}
              </div>
            </div>
          </div>

          <div className='Modal_inner_content'>
            <div className='sideNav_content'>
              {this.Display(this.state.selectValue.value)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
