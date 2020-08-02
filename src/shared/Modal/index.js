/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
import "./index.css";
import "../../App.css";
function index({
  width,
  height,
  modalTitle,
  onCLose,
  children,
  modalButton,
  modalPurpose,
  modalType,
}) {
  const style = { height: height, width: width };
  return (
    <div className='Overlay'>
      <div className='Modal' style={style}>
        <div className='Modal_inner'>
          <div
            className={
              modalType == "Delete" ? "DeleteModal_header " : "Modal_header"
            }>
            <span> {modalTitle}</span>
            <img
              src={require("../../shared/Icon/closeImg.png")}
              className='CloseModal_icon'
              onClick={onCLose}
            />
          </div>
          <div className='Modal_contaner'>{children}</div>
          <div className='Modal_footer'>
            <p>{modalPurpose}</p>
            <button
              className={modalType == "Delete" ? "btn DeleteModal_btn" : "btn"}>
              {modalButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;