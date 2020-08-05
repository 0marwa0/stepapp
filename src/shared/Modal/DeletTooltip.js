/** @format */
import "./index.css";
import React from "react";
const index = () => {
  return (
    <div class='container'>
      <div class='time-of-year'>
        Hover over me!
        <div class='tooltip'>
          Using this filter allows you to view all photos that were taken in a
          particular month.
        </div>
      </div>
    </div>
  );
};

export default index;
