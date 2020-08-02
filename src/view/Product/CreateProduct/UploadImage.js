/** @format */

import React from "react";
import "./index.css";
const index = () => {
  return (
    <div className='upload_modal'>
      <div className='upload_modal_bg'>
        <img src={require("../../../shared/Icon/upload.png")} />
        <p>
          {" "}
          Choose a file from your PC or
          <span>drag& drop</span>here
        </p>
        <div className='file-wrapper'>
          <span className='label'>Browse</span>

          <input
            type='file'
            name='upload'
            id='upload'
            class='upload-box'
            placeholder='Upload image'
          />
        </div>
      </div>
    </div>
  );
};

export default index;
