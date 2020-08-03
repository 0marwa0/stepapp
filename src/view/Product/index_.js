/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import "../../shared/List/index.css";

import ProductFilter from ".";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedData: [] };
  }

  render() {
    return (
      <div>
        <Header slug='Products List' />
        <div className='container'>
          <ProductFilter selectedData={this.state.selectedData} />
        </div>
      </div>
    );
  }
}

export default index;
