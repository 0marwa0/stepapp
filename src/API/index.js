/** @format */

import axios from "axios";
import { Config } from "./Config";
export default class API extends axios {
  static login(data) {
    let URL = `${Config.host}/login`;

    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("USER_TOKEN"),
      },
      body: JSON.stringify(data),
    };

    fetch(URL, options).then((resp) => resp.json());
    // .then((jsonData) => callback(null, jsonData))
    // .catch((err) => callback(err.message, null));

    // let formdata = new FormData();
    // formdata.append("email", "murtadha");
    // formdata.append("password", "123");
    // this.post(
    //   URL,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    //   formdata
    // )
    //   .then(function (response) {
    //     let token = response.data.token;
    //     localStorage.setItem("USER_TOKEN", token);
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
    let URLs = `${Config.host}/product`;
    this.post(
      URLs,

      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("USER_TOKEN"),
        },
      },
      data
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, "error withe add product");
      });

    // fetch("https://step-copy.herokuapp.com/dash/v1/product", {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: "name2",
    //     description: "description",
    //     price: 200,
    //     subgroup: 1,
    //     components: [1],
    //   }),
    // })
    //   .then((res) => {
    //     res.json();
    //   })
    //   .then((data) => console.log(data)) // ur data is here
    //   .catch((err) => console.log("api Erorr: ", err));
  }
}
