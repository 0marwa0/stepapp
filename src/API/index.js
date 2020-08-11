/** @format */

import axios from "axios";
import { Config } from "./Config";
export default class API extends axios {
  static login(params, onSuccess, onFailure) {
    let URL = `${Config.host}/login`;

    this.post(URL, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        let data = response.data;
        onSuccess(data);
        console.log(response, "on success");
      })
      .catch((error) => {
        onFailure(error.response, "on failure");
        console.log(error.response);
      });
  }

  static getCustomers(callback) {
    let URL = `${Config.host}/users`;

    this.get(URL, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("USER_TOKEN"),
      },
    })
      .then(function (response) {
        let data = response.data;
        callback(data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getStuff(callback) {
    let URL = `${Config.host}/admins`;

    this.get(URL, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("USER_TOKEN"),
      },
    })
      .then(function (response) {
        let data = response.data;
        callback(data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  static getProduct() {
    let URL = `${Config.host}/products`;
    this.get(URL, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("USER_TOKEN"),
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static addProduct(data) {
    let URL = `https://step-copy.herokuapp.com/dash/v1/product`;

    var formdata = new FormData();
    formdata.append("name", "iem1");
    formdata.append("description", "item description");
    formdata.append("price", "200");
    formdata.append("subgroup", "sub");
    formdata.append("components", "1");

    let options = {
      method: "post",
      body: formdata,
      headers: {
        "Content-Type": "application/json; charset=utf-8",

        token: localStorage.getItem("USER_TOKEN"),
      },
    };

    this.post(
      "https://step-copy.herokuapp.com/dash/v1/product",
      {
        headers: {
          token: localStorage.getItem("USER_TOKEN"),
          "Content-Type": "application/json",
        },
      },
      {}
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response, "error msg");
      });

    // axios
    //   .post(
    //     "https://step-copy.herokuapp.com/dash/v1/product",

    //     {
    //       headers: {
    //         // "Content-Type": "application/json",
    //         token: localStorage.getItem("USER_TOKEN"),
    //       },
    //     },
    //     {
    //       name: "name2",
    //       description: "description",
    //       price: 200,
    //       subgroup: 1,
    //       components: [1],
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error, "error withe add product");
    //   });

    // Axios.post(
    //   "https://step-copy.herokuapp.com/dash/v1/login",
    //   {
    //     email: "fs",
    //     password: "MY_PASSWORD",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  }
}
