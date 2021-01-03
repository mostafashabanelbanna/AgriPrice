import Axios from "axios";

// create instance for axios default configration
export const axios = Axios.create({
  baseURL: "https://localhost:44334/api",
  //   headers: { Auth: "auth" },

  timeout: 10000,
});
