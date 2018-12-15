import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: window.cfg.baseurl, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method !== 'get' && store.getters.token) {
      // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.errno !== 0) {
      Message({
        message: res.errmsg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.errno === 50008 || res.errno === 50012 || res.errno === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

service.get = function(url, params, cookie = window.cfg.cookie, options = {}) {
  return service({
    url,
    params,
    method: 'GET',
    withCredentials: cookie,
  })
}

function complexMethod(method, url, data, cookie = window.cfg.cookie, options = {}) {
  const isFormData = data instanceof FormData;
  var __options = {
    url,
    data: isFormData ? data : qs.stringify(data),
    method,
    headers: {
      ...options.headers
    },
    withCredentials: cookie,
  };
  if (!isFormData) {
    __options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return service(__options);
}

function createMethod(method) {
  return function(...args) {
    return complexMethod(method, ...args);
  }
}

service.post = createMethod('POST');
service.delete = createMethod('DELETE');
service.put = createMethod('PUT');

export default service
