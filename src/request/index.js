import axios from 'axios'
let baseUrl = process.env
if(window.process) baseUrl = window.process.env

const service = axios.create({
  baseURL: baseUrl.VUE_APP_BI_API,
  'X-Requested-With': 'XMLHttpRequest',
  withCredentials: true,
  timeout: 100000,
});
service.interceptors.request.use(config => {
  // get请求添加isajax
  if (config.method == 'get'){
    config.params = {
     ...(config.params || {}),
     isajax : 1
   }
  }
  return config;
},error => {
  return Promise.reject(error);
}
);
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;