/** @format */
import Modal from "../../../shared/Modal";
import React from "react";
import "../CreateProduct/index.css";
import UploadImage from "./UploadImage";
import "./index.css";
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
export class index extends React.Component {
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

  getSubGroups = () => {
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
  getComponents = () => {
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
  };
  componentDidMount() {
    this.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ selectedGroup: this.props.value });
    }
  }
  render() {
    const { selectedOption } = this.state;

    let selectStyle = {
      menu: (styles) => ({
        ...styles,
        width: "100%",
        borderRadius: 6,
        height: "auto",
      }),

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

    // let name = this.props.data.map((i) => i.name);
    // let price = this.props.data.map((i) => i.price);
    let categories = this.props.categories.map((item) => {
      return { value: item.name, label: item.name };
    });
    let categoriesOptions = categories.concat({
      custom: true,
      isDisabled: true,
    });

    let groups = [];
    this.props.selectedGroup.length != 0
      ? (groups = this.props.selectedGroup.map((item) => {
          return { value: item.name, label: item.name };
        }))
      : (groups = [
          {
            value: "",
            label: (
              <p className='no_data'>
                <img
                  src={require("../../../shared/Icon/noData.png")}
                  style={{ width: "100%", height: "150px" }}
                />
              </p>
            ),
            isDisabled: true,
          },
        ]);

    let groupsOptions = groups.concat({
      custom: true,
      isDisabled: true,
    });
    let subgroups = [];

    this.props.selectedSubGroup.length != 0
      ? (subgroups = this.props.selectedSubGroup.map((item) => {
          return { value: item.name, label: item.name };
        }))
      : (subgroups = [
          {
            value: "",
            label: (
              <p className='no_data'>
                <img
                  src={require("../../../shared/Icon/noData.png")}
                  style={{ width: "100%", height: "150px" }}
                />
              </p>
            ),
            isDisabled: true,
          },
        ]);
    let subgroupsOptions = subgroups.concat({
      custom: true,
      isDisabled: true,
    });
    let components = this.props.components.map((item) => {
      return { value: item.name, label: item.name };
    });
    let componentsOptions = components.concat({
      custom: true,
      isDisabled: true,
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
                placeholder='S type calvicle'
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
                data={this.state.categories}
                options={categoriesOptions}
                isSearchable={false}
                styles={selectStyle}
                DisplayAddCategory={this.DisplayAddCategory}
                value={this.state.selectedOption}
                onChange={this.props.handelCategory}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>2nd stage category</p>
            <span
              className={
                this.props.validGroup ? "input_border" : "input_border loading"
              }>
              <Select
                components={{
                  Option: GroupOption,
                  IndicatorSeparator: () => null,
                }}
                options={groupsOptions}
                isDisabled={this.props.validGroup ? false : true}
                isSearchable={false}
                styles={selectStyle}
                data={this.state.selectedGroup}
                DisplayAddGroup={this.DisplayAddGroup}
                value={this.state.selectedOption}
                onChange={this.props.handelGroup}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>1st stage category</p>
            <span
              className={
                this.props.validSupGroup
                  ? "input_border"
                  : "input_border loading"
              }>
              <Select
                components={{
                  Option: SubGroupOption,
                  IndicatorSeparator: () => null,
                }}
                options={subgroupsOptions}
                isDisabled={this.props.validSupGroup ? false : true}
                isSearchable={false}
                styles={selectStyle}
                data={this.state.selectedSubGroup}
                DisplayAddSubGroup={this.DisplayAddSubGroup}
                value={this.state.selectedOption}
                onChange={(e) => this.props.handelSubGroup(e)}
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
              options={componentsOptions}
              isSearchable={false}
              styles={selectStyle}
              isMulti={true}
              data={this.state.categories}
              DisplayAddComponent={this.DisplayAddComponent}
              value={this.state.selectedOption}
              onChange={this.props.handelComponent}
            />
          </span>
        </div>
        <UploadImage
          Active={this.props.Active}
          isActive={this.props.isActive}
          Image={this.props.Image}
          dragEnter={this.props.dragEnter}
          dragLeave={this.props.dragLeave}
          dragOver={this.props.dragOver}
          fileDrop={this.props.fileDrop}
          removeImage={this.props.removeImage}
          handleImageChange={this.props.handleImageChange}
          allowToChange={this.props.allowToChange}
        />
        {this.state.showAddComponent ? (
          <Modal
            modalButton='Save Component'
            modalPurpose=''
            modalTitle='Add New Component'
            width='40%'
            height='70%'
            size='sm'
            DisableBtn={this.props.DisableBtn}
            fun={this.props.addComponent}
            onCLose={() => this.DisplayAddComponent(false)}>
            <CreateComponent handelChange={this.props.handelChange} />
          </Modal>
        ) : null}
        {this.state.showAddCategory ? (
          <Modal
            modalButton='Save Category'
            modalPurpose=''
            modalTitle='Add New Category'
            width='40%'
            height='35%'
            fun={this.props.addCategory}
            size='sm'
            DisableBtn={this.props.DisableBtn}
            onCLose={() => this.DisplayAddCategory(false)}>
            <CreateCategory handelChange={this.props.handelNameChange} />
          </Modal>
        ) : null}
        {this.state.showAddSubGroup ? (
          <Modal
            modalButton='Save SubGroup'
            modalPurpose=''
            modalTitle='Add New SubGroup'
            width='40%'
            height='35%'
            fun={this.props.addSubGroup}
            size='sm'
            DisableBtn={this.props.DisableBtn}
            onCLose={() => this.DisplayAddSubGroup(false)}>
            <CreateSubGroup handelChange={this.props.handelNameChange} />
          </Modal>
        ) : null}
        {this.state.showAddGroup ? (
          <Modal
            modalButton='Save Group'
            modalPurpose=''
            modalTitle='Add New Group'
            width='40%'
            height='35%'
            fun={this.props.addGroup}
            size='sm'
            DisableBtn={this.props.DisableBtn}
            onCLose={() => this.DisplayAddGroup(false)}>
            <CreateGroup handelChange={this.props.handelNameChange} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default index;
