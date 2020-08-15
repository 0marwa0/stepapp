/** @format */

import React from "react";
import "./index.css";
import Select from "react-select";
import { AiOutlineLock } from "react-icons/ai";
const options = [
  { value: "pd", label: "pd" },
  { value: "admin", label: "admin" },
  { value: "support", label: "support" },
];

class index extends React.Component {
  state = {
    selectedOption: { value: "pd", label: "pd" },
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
    const { selectedOption } = this.state;
    return (
      <div>
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>Employee name</p>
            <span className='input_border'>
              <input
                type='text'
                width='100%'
                onChange={(e) => this.props.handelInputChange(e, "name")}
                // placeholder='name'
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Phone number</p>
            <span className='input_border '>
              <input
                type='text'
                width='100%'
                onChange={(e) => this.props.handelInputChange(e, "phone")}
                // placeholder='0780123567'
              />
            </span>
          </div>
        </div>
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>E-mail</p>
            <span className='input_border'>
              <input
                type='text'
                onChange={(e) => this.props.handelInputChange(e, "email")}
                width='200px'
                // placeholder='email'
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Team</p>

            <span className='input_border'>
              <Select
                options={options}
                defaultValue=''
                isSearchable={false}
                value={this.state.selectedOption}
                styles={selectStyle}
                onChange={this.handleChange}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Birth year </p>
            <span className='input_border'>
              <input
                type='text'
                onChange={(e) => this.props.handelInputChange(e, "birthday")}
                // placeholder='1999'
              />
            </span>
          </div>{" "}
          <div className='input_wrapper space_wrapper'>
            <p>Location</p>
            <span className='input_border'>
              <input
                type='text'
                onChange={(e) => this.props.handelInputChange(e, "location")}
                // placeholder='lorem'
              />
            </span>
          </div>
        </div>{" "}
        <div className='two_col_flex paddingTop'>
          <div className='input_wrapper space_wrapper'>
            <p>password</p>
            <span className='input_border'>
              <input
                type='password'
                onChange={(e) => this.props.handelInputChange(e, "password")}
                width='200px'
                // placeholder='******'
              />
            </span>
          </div>
          <div className='input_wrapper space_wrapper'>
            <p>Confirm password</p>
            <span className='input_border'>
              <input
                type='text'
                // placeholder='Re-write the same password'
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
