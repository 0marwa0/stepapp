/** @format */

import React from "react";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import UploadImage from "./UploadImage";
import EditProduct from "./EditProduct.js";

class CreateProduct extends React.Component {
  state = {
    data: {
      name: "name2",
      description: "description",
      price: 200,
      subgroup: 1,
      components: [1],
      Image: require("../../../shared/Icon/upload.png"),
    },
    Image: require("../../../shared/Icon/upload.png"),
    allowToChange: false,
    isActive: false,
  };
  Active = (isActive) => {
    this.setState({ isActive });
  };
  handleImageChange = (event, key) => {
    let value = event.target.files[0];
    let data = this.state.data;
    this.setState({
      Image: URL.createObjectURL(event.target.files[0]),
      allowToChange: true,
    });

    var reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = function () {
      data[key] = reader.result;
    };
    this.setState({ data });
  };
  removeImage = () => {
    this.setState({
      Image: require("../../../shared/Icon/upload.png"),
      allowToChange: false,
    });
  };
  handelInputChange = (event, key) => {
    let value = event.target.value;
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  };
  render() {
    return (
      <div>
        <EditProduct handelInputChange={this.handelInputChange} />
        <div>
          <div className='upload_text'>Product photo</div>
          <div
            onDragOver={() => this.Active(true)}
            onDragLeave={() => this.Active(false)}
            className={
              this.state.isActive ? "upload_modal active" : "upload_modal "
            }>
            <div className='upload_img_close'>
              {this.state.allowToChange ? (
                <AiOutlineClose
                  size='20px'
                  style={{ cursor: "pointer" }}
                  onClick={this.removeImage}
                />
              ) : null}

              <img src={this.state.Image} className='img' />
            </div>
            <span>
              Drop file here or
              <input
                type='file'
                id='file'
                onChange={(e) => this.handleImageChange(e, "Image")}
              />
              <label for='file'> browse</label>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProduct;
