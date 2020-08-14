/** @format */

import React from "react";
import Select from "react-select";
import "./index.css";
import "../../App.css";
import Group from "../../API/middleware/Groups";
import Category from "../../API/middleware/Category";
import SubGroup from "../../API/middleware/SubGroup";
import { FiTrash } from "react-icons/fi";
import Loader from "react-loader-spinner";

const options = [
  { value: "categories", label: "Main Category" },
  { value: "groups", label: "Group" },
  { value: "subgroups", label: "Sub Group" },
];
class index extends React.Component {
  state = {
    selectValue: { value: "categories", label: " Main Category" },
    groups: this.props.groups ? this.props.groups : [],
    subgroups: this.props.subgroups ? this.props.subgroups : [],
    categories: this.props.categories ? this.props.categories : [],
  };
  onChange = (event) => {
    this.setState({ selectValue: event });
  };

  deleteItem = (id, value) => {
    switch (value) {
      case "categories":
        Category.deleteCategory(id);
        this.setState({
          categories: this.state.categories.filter((item) => item.id !== id),
        });
        break;
      case "groups":
        Group.deleteGroup(id);
        this.setState({
          groups: this.state.groups.filter((item) => item.id !== id),
        });
        break;
      case "subgroups":
        SubGroup.deleteSubGroup(id);
        this.setState({
          subgroups: this.state.subgroups.filter((item) => item.id !== id),
        });
        break;
      default:
        break;
    }
  };
  Display = (value) => {
    if (value == "categories") {
      return this.state.categories.map((item) => (
        <div className='sideNav_item'>
          <p>{item.name}</p>
          <FiTrash
            color='red'
            style={{ cursor: "pointer" }}
            onClick={() => this.deleteItem(item.id, value)}
          />
        </div>
      ));
    }

    if (value == "groups") {
      return this.state.groups.map((item) => (
        <div className='sideNav_item'>
          <p>{item.name}</p>
          <FiTrash
            color='red'
            style={{ cursor: "pointer" }}
            onClick={() => this.deleteItem(item.id, value)}
          />
        </div>
      ));
    }
    if (value == "subgroups") {
      return this.state.subgroups.map((item) => (
        <div className='sideNav_item'>
          <p>{item.name}</p>
          <FiTrash
            color='red'
            style={{ cursor: "pointer" }}
            onClick={() => this.deleteItem(item.id, value)}
          />
        </div>
      ));
    }
  };
  handleClose = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.DisplaySideNav(false);
  };
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
                  <Loader
                    type='Oval'
                    color='black'
                    style={{ opacity: 1 }}
                    height={15}
                    width={15}
                  />
                ) : (
                  <img
                    src={require("../../shared/Icon/searchIcon.png")}
                    height='13px'
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
