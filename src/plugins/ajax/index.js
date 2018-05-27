import axios from 'axios';
import {merge} from 'lodash'
// import store from '../../store'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));
axios.defaults.withCredentials = true;

const globalOptions = {
  baseURL: window.location.protocol + '//' + window.location.host + '/',
  // baseURL: '/api',
  timeout: 60000,
  headers: {
    'axios-header': 'axios'
  }
};

/**
 * 对所有请求添加时间戳，
 * 解决请求数据缓存问题
 */
function convertURL(url) {
  // 获取时间戳
  let timstamp = (new Date()).valueOf();
  // 将时间戳信息拼接到url上
  if (url.indexOf('?') >= 0) {
    url = url + '&t=' + timstamp;
  } else {
    url = url + '?t=' + timstamp;
  }
  return url;
}

export default {
  basePath () {
    return globalOptions.baseURL;
  },
  post (url, data, config) {
    // 序列化Object参数
    let sendData = ''
    for (let key in data) {
      sendData += `${key}=${data[key]}&`
    }
    sendData = sendData.slice(0, -1)
    // 处理配置参数
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge(globalOptions, config);
    } else {
      options = globalOptions;
    }
    return axios.post(convertURL(url), sendData, options).then((res) => {
      return res;
    })
  },
  get (url, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge({}, globalOptions, config)
    } else {
      options = globalOptions;
    }
    return axios.get(convertURL(url), options).then((res) => {
      return res;
    })
  },
  delete (url, params, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge({}, globalOptions, config)
    } else {
      options = globalOptions;
    }
    return axios.delete(convertURL(url), options).then((res) => {
      return res;
    })
  }
}
