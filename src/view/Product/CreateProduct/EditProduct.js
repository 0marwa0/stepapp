/** @format */
import React from "react";
import Modal from "../../../shared/Modal";
import { FaPlus } from "react-icons/fa";

import Select, { components } from "react-select";
import { CreateComponent } from "./CreatModel";
import { ToastContainer, toast } from "react-toastify";
const ComponentOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return data.custom ? (
    <div
      className='custom_option'
      ref={innerRef}
      {...innerProps}
      onClick={() => props.selectProps.DisplayAddComponent(true)}>
      <p>
        <FaPlus /> New Component
      </p>
    </div>
  ) : (
    <components.Option {...props} />
  );
};
class index extends React.Component {
  state = {
    showAddComponent: false,
  };
  DisplayAddComponent = (showAddComponent) => {
    this.setState({ showAddComponent });
  };
  render() {
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
    let name = this.props.data.map((i) => i.name);
    let price = this.props.data.map((i) => i.price);
    let components = this.props.data.map((i) =>
      i.components.map((item) => {
        return { value: item.name, label: item.name };
      })
    );
    const options = components.concat({ custom: true, isDisabled: true });
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
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>Product name</p>
            <span className='input_border'>
              <input
                type='text'
                width='100%'
                placeholder='S type calvicle'
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
                placeholder='$ 1,000'
                width='100%'
                defaultValue={price}
                onChange={(e) => this.props.handelInputChange(e, "price")}
              />
            </span>
          </div>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Components</p>
          <span className='input_border'>
            <Select
              components={{
                Option: ComponentOption,
                IndicatorSeparator: () => null,
              }}
              options={options}
              isSearchable={false}
              styles={selectStyle}
              isMulti={true}
              DisplayAddComponent={this.DisplayAddComponent}
              //   value={this.state.selectedOption}
              onChange={(e) => this.props.handleSelect(e, "components")}
            />
          </span>
        </div>
        {this.state.showAddComponent ? (
          <Modal
            modalButton='Save Component'
            modalPurpose=''
            modalTitle='Add New Component'
            width='50%'
            height='75%'
            DisableBtn={this.state.DisableBtn}
            fun={this.addComponent}
            onCLose={() => this.DisplayAddComponent(false)}>
            <CreateComponent handelChange={this.handelComponentChange} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default index;
