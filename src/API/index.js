/** @format */

// /** @format */

import { Config } from "./Config";
import axios from "axios";
export const loadData = (query, callback) => {
  // let data ;
  fetch(`${Config.host}${query}`, {
    headers: {
      token: localStorage.getItem("step_token"),
    },
  })
    .then((resp) => resp.json())
    .then((jsonData) => {
      callback(null, jsonData);

      console.log(jsonData);
    })
    .catch((err) => callback(err.message, null));
};

export const removeItem = (query, id, callback) => {
  fetch(`${Config.host}${query}/${id}`, {
    method: "delete",
    headers: {
      token: localStorage.getItem("step_token"),
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((jsonData) => callback(null, jsonData))
    .catch((err) => callback(err.message, null));
};

export const removeItems = (query, ids, callback) => {
  fetch(`${Config.host}${query}`, {
    method: "delete",
    headers: {
      token: localStorage.getItem("step_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  })
    .then((resp) => resp.json())
    .then((jsonData) => callback(null, jsonData, ids))
    .catch((err) => callback(err.message, null, ids));
};

export const addData = (query, data, callback) => {
  let options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("step_token"),
    },
    body: JSON.stringify(data),
  };

  if (query == "product") {
    var formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("subgroup", data.subgroup);
    formdata.append("components", data.components);
    formdata.append("image", data.image);
    formdata.append("description", data.description);
    options = {
      method: "post",
      body: formdata,
      headers: {
        token: localStorage.getItem("step_token"),
      },
    };
  } else {
  }
  fetch(`${Config.host}${query}`, options)
    .then((resp) => resp.json())
    .then((jsonData) => {
      callback(null, jsonData);
      console.log(jsonData, "data added");
    })
    .catch((err) => callback(err.message, null));
};

export const editData = (query, data, id, callback) => {
  let options = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("step_token"),
    },
    body: JSON.stringify(data),
  };

  if (query == "product") {
    var formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("components", data.components);
    options = {
      method: "put",
      body: formdata,
      headers: {
        token: localStorage.getItem("step_token"),
      },
    };
  } else {
  }
  fetch(`${Config.host}${query}/${id}`, options)
    .then((resp) => resp.json())
    .then((jsonData) => {
      callback(null, jsonData);
      console.log(jsonData, "on success");
    })
    .catch((err) => {
      callback(err.message, null);
      console.log(err, "on failure");
    });
};

export const changeImage = (query, data, callback) => {
  // var formdata = new FormData();
  // formdata.append("image", data.image);
  // let options = {
  //   method: "put",
  //   body: formdata,
  //   headers: {
  //     token: localStorage.getItem("step_token"),
  //   },
  // };
  let options = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("step_token"),
    },
    body: JSON.stringify(data),
  };

  fetch(`${Config.host}${query}`, options)
    .then((resp) => resp.json())
    .then((jsonData) => callback(null, jsonData))
    .catch((err) => callback(err.message, null));
};
