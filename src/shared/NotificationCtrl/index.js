import React from "react";
import "./index.css";
const index = ({ icon, number, label }) => {
  return (
    <div className="notification_wrapper">
      <span className="notification_icon">
        <img src={require(`../../shared/Icon/${icon}`)} alt="" />
      </span>
      <div>
        <span className="num">{number}</span>

        <span className="label">{label}</span>
      </div>
    </div>
  );
};

export default index;
