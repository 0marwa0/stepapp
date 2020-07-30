import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
const Header = ({ slug }) => {
  return (
    <div className="header_wrapper">
      <div className="container">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span className="slash_icon"> \ </span> {slug}
      </div>
    </div>
  );
};

export default Header;
