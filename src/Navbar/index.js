import React from "react";
import "./index.css";
import { FaRegUserCircle } from "react-icons/fa";
const index = () => {
  return (
    <div className="navBar">
      <div>
        <img
          src={require("../shared/Icon/Logo.png")}
          alt=""
          style={{ height: "22px" }}
        />
      </div>
      <div>
        <FaRegUserCircle color="white" size="31px" />
        {/* <img src={require("../shared/Icon/User.png")} /> */}
      </div>
    </div>
  );
};

export default index;
