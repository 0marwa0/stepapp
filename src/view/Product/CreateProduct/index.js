/** @format */

import React from "react";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import UploadImage from "./UploadImage";
import EditProduct from "./EditProduct.js";

class CreateProduct extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div>
        <EditProduct
          data={this.props.data}
          handelInputChange={this.props.handelInputChange}
          components={this.props.components}
          groups={this.state.groups}
          subgroups={this.state.subgroups}
          category={this.state.categories}
          handleSelect={this.props.handleSelect}
        />
        <UploadImage
          Active={this.props.Active}
          isActive={this.props.isActive}
          Image={this.props.Image}
          removeImage={this.props.removeImage}
          handleImageChange={this.props.handleImageChange}
          allowToChange={this.props.allowToChange}
        />
      </div>
    );
  }
}

export default CreateProduct;
