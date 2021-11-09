/*
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-05 09:57:54
 * @LastEditTime: 2021-11-05 10:02:31
 * @LastEditors: mzr
 */

import axios from "axios"

// 在开发环境中的测试 development
// if(process.env.NODE_ENV == "development") {
//   axios.defaults.baseURL = "http://"
// }
// // 在生产环境中的测试 production                                                                                                                  
// if(process.env.NODE_ENV == "production") {
//   axios.defaults.baseURL = "https://"
// }

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // if(config.type && config.type === '111'){
    //   config.baseURL = '/qqchat'
    // }
    if (config.url.indexOf("Authenticate") > 0) {
      return config;
    }

    const token = sessionStorage.getItem("token");
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // if (!sessionStorage.getItem("token")) {
    //   this.$message.destroy();
    //   this.$message.error("获取数据失败，请重新获取权限");
    // } else {
    //   this.$message.destroy();
    //   this.$message.error(error.response ? error.response.data.msg : "请求失败，请联系管理员");
    //   sessionStorage.removeItem("token");
    // }
    return Promise.reject(error);
  }
);

export default axios



