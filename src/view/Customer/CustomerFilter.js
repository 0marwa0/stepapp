/** @format */

import React, { useState } from "react";
import ListFilter from "../../shared/List/List_filter";
import DeleteCustomer from "./DeleteCustomer_";
import Modal from "../../shared/Modal/index";
import CreateCustomer from "./CreateCustomer";

function Index({ isChecked, selectedData }) {
  const [showModel, setModel] = useState(false);
  const DisplayModel = (show) => {
    setModel(show);
  };
  const [showDeleteModel, setDeleteModel] = useState(false);
  const DisplayDeleteModel = (Delete) => {
    setDeleteModel(Delete);
  };

  return (
    <div>
      <ListFilter
        isChecked={isChecked}
        selectedData={selectedData}
        showModal={() => DisplayModel(true)}
        ListName='customer'
        DeleteModal={() => DisplayDeleteModel(true)}
      />

      {showModel ? (
        <Modal
          modalType='Create'
          modalButton='Create New Account '
          modalPurpose='From here you can create new accounts'
          modalTitle='Add new customer'
          width='60%'
          height='70%'
          onCLose={() => DisplayModel(false)}>
          <CreateCustomer />
        </Modal>
      ) : null}
      {showDeleteModel ? (
        <Modal
          modalButton='Delete Account'
          modalType='Delete'
          modalPurpose='Write the name with respect to letter casing '
          modalTitle='Delete customer '
          width='45%'
          height='50%'
          onCLose={() => DisplayDeleteModel(false)}>
          <DeleteCustomer />
        </Modal>
      ) : null}
    </div>
  );
}

export default Index;
