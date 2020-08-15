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
  fun,
  isMulti,
  onBack,
  props,
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
            {isMulti ? (
              <div>
                <button className='next_btn btn' onClick={onBack}>
                  back
                </button>
              </div>
            ) : null}
            <div>
              <button
                // disabled={true}
                onClick={() => fun(onCLose)}
                className={
                  modalType == "Delete" ? "btn DeleteModal_btn" : "btn btn_ctrl"
                }>
                {modalButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
