import axios from 'axios';
import {merge} from 'lodash'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));
axios.defaults.withCredentials = true;

const globalOptions = {
  // baseURL: window.location.protocol + '//' + window.location.host + '/',
  baseURL: 'https://192.168.211.218/',
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

function checkStatus(response) {
  if (!response || response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: response.statusText
    }
  }
}

function checkCode(res) {
  if (res && res.data.code === -404) {
    alert(res.data.message)
  }
  return res
}

function checkTimeout(res) {
  if (res && res.data === 'timeout') {
    localStorage.clear()
    window.location.reload('/Home');
    return res
  } else {
    return res
  }
}

export default {
  basePath () {
    return globalOptions.baseURL;
  },
  post (url, data, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge(globalOptions, config);
    } else {
      options = globalOptions;
    }
    return axios.post(convertURL(url), data, options).then(checkStatus).then(checkCode).then(checkTimeout).then((res) => {
      return res;
    })
  },
  get (url, params, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge({}, globalOptions, {params: params}, config)
    } else {
      options = merge({}, globalOptions, {params: params});
    }
    return axios.get(convertURL(url), options).then(checkStatus).then(checkCode).then((res) => {
      return res;
    })
  }
}
