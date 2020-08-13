/** @format */

import React, { Component } from "react";
import ListFilter from "../../shared/List/List_filter";
import { useState } from "react";
import CreateStuff from "./CreateStuff";
import Modal from "../../shared/Modal";
function Index({
  selectedData,
  DisplayEditModel,
  handelInputChange,
  handelCreateStuff,
}) {
  const [showModel, setModel] = useState(false);

  const DisplayModel = (show) => {
    setModel(show);
  };

  return (
    <div>
      <ListFilter
        showModal={() => DisplayModel(true)}
        ListName='Stuff'
        selectedData={selectedData}
        DisplayEditModel={DisplayEditModel}
      />

      {showModel ? (
        <Modal
          modalButton='Create New Item '
          modalPurpose='From here you can create new accounts'
          modalTitle='Add new team member'
          width='60%'
          height='75%'
          fun={handelCreateStuff}
          onCLose={() => DisplayModel(false)}>
          <CreateStuff handelInputChange={handelInputChange} />
        </Modal>
      ) : null}
    </div>
  );
}

export default Index;
