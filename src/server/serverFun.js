import axios from "../utils/axios";

export const get = (url, params) => {
  return axios({
    method: "get",
    url,
    params,
    headers: { token: window.localStorage.getItem("token") },
  });
};

export const post = (url, params) => {
  return axios({
    method: "post",
    url,
    data: params,
    headers: { token: window.localStorage.getItem("token") },
  });
};
