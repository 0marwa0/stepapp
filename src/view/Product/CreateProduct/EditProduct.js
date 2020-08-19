/** @format */
import Modal from "../../../shared/Modal";
import React from "react";
import "../CreateProduct/index.css";
import Select, { components } from "react-select";
import { loadData, addData } from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import {
  CreateComponent,
  CreateCategory,
  CreateGroup,
  CreateSubGroup,
} from "./CreatModel";
import {
  ResponseToast,
  ResponseToastMsg,
  RejectToast,
  ErrorToast,
  SuccessToast,
} from "../../../API/ToastErrorHandle";
import { FaPlus } from "react-icons/fa";
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
const CategoryOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return data.custom ? (
    <div
      className='custom_option'
      ref={innerRef}
      {...innerProps}
      onClick={() => props.selectProps.DisplayAddCategory(true)}>
      <p>
        <FaPlus /> New Category
      </p>
    </div>
  ) : (
    <components.Option {...props} />
  );
};
const GroupOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return data.custom ? (
    <div
      className='custom_option'
      ref={innerRef}
      {...innerProps}
      onClick={() => props.selectProps.DisplayAddGroup(true)}>
      <p>
        <FaPlus /> New Group
      </p>
    </div>
  ) : (
    <components.Option {...props} />
  );
};
const SubGroupOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return data.custom ? (
    <div
      className='custom_option'
      ref={innerRef}
      {...innerProps}
      onClick={() => props.selectProps.DisplayAddSubGroup(true)}>
      <p>
        <FaPlus /> New SubGroup
      </p>
    </div>
  ) : (
    <components.Option {...props} />
  );
};
export class EditProduct extends React.Component {
  state = {
    groups: [],
    subgroups: [],
    categories: [],
    components: [],
    showAddGroup: false,
    showAddSubGroup: false,
    showAddComponent: false,
    showAddCategory: false,
    name: { name: "" },
    componentData: {
      name: "",
      description: "",
      price: null,
      size: "",
    },
    DisableBtn: true,
  };

  DisplayAddCategory = (showAddCategory) => {
    this.setState({ showAddCategory });
  };
  DisplayAddGroup = (showAddGroup) => {
    this.setState({ showAddGroup });
  };
  DisplayAddSubGroup = (showAddSubGroup) => {
    this.setState({ showAddSubGroup });
  };
  DisplayAddComponent = (showAddComponent) => {
    this.setState({ showAddComponent });
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
  handelNameChange = (e) => {
    let value = e.target.value;
    let name = this.state.name;
    name["name"] = value;
    this.setState({ name });
    if (value.length === 0) {
      this.setState({ DisableBtn: true });
    } else this.setState({ DisableBtn: false });
  };
  handelComponentChange = (e, key) => {
    let value = e.target.value;
    let componentData = this.state.componentData;
    componentData[key] = value;
    this.setState({ componentData });
    if (value.length === 0) {
      this.setState({ DisableBtn: true });
    } else this.setState({ DisableBtn: false });
  };
  addGroup = (callback) => {
    addData(
      "group",
      this.state.name,
      (errMsg, data) => {
        callback();

        if (data.status) {
          console.log(data, "request rsulte");
          SuccessToast("Added Successfully");
          // this.getData();
          this.setState({ name: "" });
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  addSubGroup = (callback) => {
    addData(
      "subgroup",
      this.state.name,
      (errMsg, data) => {
        callback();

        if (data.status) {
          SuccessToast("Added Successfully");
          // this.getData();
          this.setState({ name: "" });
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  addCategory = (callback) => {
    addData(
      "category",
      this.state.name,
      (errMsg, data) => {
        callback();

        if (data.status) {
          SuccessToast("Added Successfully");
          // this.getData();
          this.setState({ name: "" });
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  addComponent = (callback) => {
    addData(
      "component",
      this.state.componentData,
      (errMsg, data) => {
        callback();

        if (data.status) {
          SuccessToast("Added Successfully");
          // this.getData();
          this.setState({ name: "" });
        } else {
          ErrorToast(errMsg);
        }
      },
      (errMsg) => {
        RejectToast(errMsg);
      }
    );
  };
  render() {
    const { selectedOption } = this.state;

    let components = this.state.components.map((item) => {
      return { value: item.name, label: item.name };
    });
    const options = components.concat({ custom: true, isDisabled: true });

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
    let categories = this.state.categories;
    const categoryOptions = categories.map((item) => {
      return { value: item.name, label: item.name };
    });

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
                components={{
                  Option: CategoryOption,
                  IndicatorSeparator: () => null,
                }}
                options={options}
                isSearchable={false}
                styles={selectStyle}
                isMulti={true}
                DisplayAddCategory={this.DisplayAddCategory}
                value={this.state.selectedOption}
                onChange={(e) => this.props.handleSelect(e, "category")}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>2nd stage category</p>
            <span className='input_border'>
              <Select
                components={{
                  Option: GroupOption,
                  IndicatorSeparator: () => null,
                }}
                options={options}
                isSearchable={false}
                styles={selectStyle}
                isMulti={true}
                DisplayAddGroup={this.DisplayAddGroup}
                value={this.state.selectedOption}
                onChange={(e) => this.props.handleSelect(e, "group")}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>1st stage category</p>
            <span className='input_border'>
              <Select
                components={{
                  Option: SubGroupOption,
                  IndicatorSeparator: () => null,
                }}
                options={options}
                isSearchable={false}
                styles={selectStyle}
                isMulti={true}
                DisplayAddSubGroup={this.DisplayAddSubGroup}
                value={this.state.selectedOption}
                onChange={(e) => this.props.handleSelect(e, "components")}
              />
            </span>
          </div>
        </div>{" "}
        <div className='input_wrapper space_wrapper'>
          <p>Component</p>
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
              value={this.state.selectedOption}
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
        {this.state.showAddCategory ? (
          <Modal
            modalButton='Save Category'
            modalPurpose=''
            modalTitle='Add New Category'
            width='40%'
            height='35%'
            fun={this.addCategory}
            size='sm'
            DisableBtn={this.state.DisableBtn}
            onCLose={() => this.DisplayAddCategory(false)}>
            <CreateCategory handelChange={this.handelNameChange} />
          </Modal>
        ) : null}
        {this.state.showAddSubGroup ? (
          <Modal
            modalButton='Save SubGroup'
            modalPurpose=''
            modalTitle='Add New SubGroup'
            width='40%'
            height='35%'
            fun={this.addSubGroup}
            size='sm'
            DisableBtn={this.state.DisableBtn}
            onCLose={() => this.DisplayAddSubGroup(false)}>
            <CreateSubGroup handelChange={this.handelNameChange} />
          </Modal>
        ) : null}
        {this.state.showAddGroup ? (
          <Modal
            modalButton='Save Group'
            modalPurpose=''
            modalTitle='Add New Group'
            width='40%'
            height='35%'
            fun={this.addGroup}
            size='sm'
            DisableBtn={this.state.DisableBtn}
            onCLose={() => this.DisplayAddGroup(false)}>
            <CreateGroup handelChange={this.handelNameChange} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default EditProduct;
