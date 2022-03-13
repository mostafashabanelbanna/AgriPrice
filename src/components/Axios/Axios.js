import Axios from "axios";

// create instance for axios default configration
export const axios = Axios.create({
  baseURL: "http://app.prices.idsc.gov.eg/api", //https://localhost:44334/api
  // baseURL: "10.10.42.164:1075/api", //http://41.128.217.182:10083/api
  // baseURL: "http://41.128.217.182:10088/api",

  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers":
    //   "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
  },

  timeout: 1000,
});
