/** @format */

import React from "react";
import "../CreateProduct/index.css";
import Select from "react-select";
import { loadData } from "../../../API";
import { ToastContainer, toast } from "react-toastify";

import {
  ResponseToast,
  ResponseToastMsg,
  RejectToast,
  // ErrorToast,
  SuccessToast,
} from "../../../API/ToastErrorHandle";
export class EditProduct extends React.Component {
  state = {
    groups: [],
    subgroups: [],
    categories: [],
    components: [],
  };

  componentDidMount() {
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

  render() {
    const { selectedOption } = this.state;
    let components = this.state.components;
    const options = components.map((item) => {
      return { value: item.name, label: item.name };
    });

    let groups = this.state.groups;
    const groupOptions = groups.map((item) => {
      return { value: item.name, label: item.name };
    });
    let subgroups = this.state.subgroups;
    const subgroupOptions = subgroups.map((item) => {
      return { value: item.name, label: item.name };
    });
    let categories = this.state.categories;
    const categoryOptions = categories.map((item) => {
      return { value: item.name, label: item.name };
    });
    let selectStyle = {
      menu: (styles) => ({ ...styles, width: "100%", borderRadius: 6 }),

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
        width: "100%",
        display: "flex",
        height: "30px",
        cursor: "pointer",
        fontSize: "14px",
        borderRadius: "3px",
        "&:focus": { boxShadow: " 0 0 3px rgba(113, 218, 247, 1)" },
        border: "1px solid var(--light-gray)",
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "all 300ms";

        return { ...provided, opacity, transition };
      },
    };
    console.log(this.props.groups, this.props.subgroups, this.props.categories);
    let name = this.props.data.map((i) => i.name);
    let price = this.props.data.map((i) => i.price);

    return (
      <div>
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>Product name</p>
            <span className='input_border'>
              <input
                type='text'
                width='100%'
                defaultValue={name}
                onChange={(e) => this.props.handelInputChange(e, "name")}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Price</p>
            <span className='input_border '>
              <input
                type='number'
                width='100%'
                defaultValue={price}
                onChange={(e) => this.props.handelInputChange(e, "price")}
              />
            </span>
          </div>
        </div>
        <div className='warp_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>3rd stage category</p>
            <span className='input_border'>
              <Select
                options={groupOptions}
                defaultValue=''
                isDisabled={true}
                isSearchable={false}
                // value={this.state.selectedOption}
                styles={selectStyle}
                // isMulti={true}
                onChange={(e) => this.props.handleSelect(e, "group")}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>2nd stage category</p>
            <span className='input_border'>
              <Select
                options={subgroupOptions}
                defaultValue=''
                isSearchable={false}
                // value={this.state.selectedOption}
                styles={selectStyle}
                // isMulti={true}
                isDisabled={true}
                onChange={(e) => this.props.handleSelect(e, "subgroup")}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>1st stage category</p>
            <span className='input_border'>
              <Select
                options={categoryOptions}
                defaultValue=''
                isSearchable={false}
                // value={this.state.selectedOption}
                styles={selectStyle}
                // isMulti={true}
                isDisabled={true}
                onChange={(e) => this.props.handleSelect(e, "category")}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </span>
          </div>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Component</p>
          <span className='input_border'>
            <Select
              options={options}
              defaultValue=''
              isSearchable={false}
              // value={this.state.selectedOption}
              styles={selectStyle}
              // isMulti={true}
              onChange={(e) => this.props.handleSelect(e, "components")}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default EditProduct;
