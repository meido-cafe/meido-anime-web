import axios from "axios";
import { toLogin } from "./index";

axios.defaults.baseURL = "";

axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response;
    const { code, message } = data;
    if (code === 401) {
      toLogin();
      return {};
    } else {
      return response.data;
    }
  },
  function (error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
