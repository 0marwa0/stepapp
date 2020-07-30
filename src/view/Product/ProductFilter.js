import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import Modal from "../../shared/Modal";
function ProductFilter() {
  const [showModel, setModel] = useState(false);
  const DisplayModel = (show) => {
    setModel(show);
  };
  return (
    <div>
      <ListFilter showModal={() => DisplayModel(true)} ListName="product" />

      {showModel ? (
        <Modal
          modalButton="Create New Item"
          modalPurpose="From here you can add products to your list"
          modalTitle="Add new Product"
          width="60%"
          height="70%"
          onCLose={() => DisplayModel(false)}
        >
          <CreateProduct />
        </Modal>
      ) : null}
    </div>
  );
}

export default ProductFilter;
