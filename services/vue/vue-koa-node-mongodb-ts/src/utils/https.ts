// axios 请求的封装。
import axios from 'axios';

// 创建 axios 实例
let service: any = {};
if ('development' === process.env.NODE_ENV) {
  service = axios.create({
    baseURL: '/api', // api 的 base_url
    timeout: 50000, // 请求超时时间
  });
} else {
  // 生产环境
  service = axios.create({
    baseURL: '/api',  // api 的 base_url
    timeout: 50000, // 请求超时时间
  });
}

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    console.error('error: ', error); // for debug
    Promise.reject(error);
  },
);

// response 拦截器 axios 的一些配置
service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    console.error('error: ', error); // for debug
    return Promise.reject(error);
  },
);

export default service;