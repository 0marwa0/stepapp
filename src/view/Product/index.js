/** @format */

import React, { Component } from "react";

import Header from "../../shared/header";

import "../../shared/List/index.css";

import ProductFilter from "./ProductFilter";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header slug='Products List' />
        <div className='container'>
          <ProductFilter />
        </div>
      </div>
    );
  }
}

export default index;
