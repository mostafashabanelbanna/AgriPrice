import Axios from "axios";

// create instance for axios default configration
export const axios = Axios.create({
  baseURL: "http://41.128.217.182:10083/api", //https://localhost:44334/api
  //baseURL: "https://localhost:44334/api", //http://41.128.217.182:10083/api

  headers: { "Content-Type": "application/json" },

  // timeout: 10000,
});
