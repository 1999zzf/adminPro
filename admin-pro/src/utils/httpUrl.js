import axios from 'axios';
import router from '../router'
axios.default.timeout = 50000;
// axios.defaults.withCredentials = true
// 接口模板
// that.$post("", {
// }).then(function (data) {
// console.log(data);
// });

//登录接口,需要获取token,


export function userpost(url, data = {}) {
  return new Promise((resolve, reject) => {
    let that = this;
    const loading = this.$loading({
      text: 'Loading',
      spinner: 'el-icon-loading',
    });
    axios({
      method: "post",
      url: sessionStorage.getItem("IP") + url,
      data: data,
      transformRequest: [
        function (oldData) {
          let newStr = '';
          for (let item in oldData) {
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
          }
          newStr = newStr.slice(0, -1);
          return newStr
        }
      ],
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
      .then(response => {
        loading.close();
        if (response.data) {
          sessionStorage.setItem("userInfo", JSON.stringify(response.data.data));
          if (response.data.code == '0000') {
            sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
          }
          resolve(response.data);
        }
      })
      .catch(err => {
        loading.close();
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误(400)';
              break;
            case 401:
              err.message = '未授权，请重新登录(401)';
              break;
            case 403:
              err.message = '拒绝访问(403)';
              break;
            case 404:
              err.message = '请求出错(404)';
              break;
            case 408:
              err.message = '请求超时(408)';
              break;
            case 500:
              err.message = '服务器错误(500)';
              break;
            case 501:
              err.message = '服务未实现(501)';
              break;
            case 502:
              err.message = '网络错误(502)';
              break;
            case 503:
              err.message = '服务不可用(503)';
              break;
            case 504:
              err.message = '网络超时(504)';
              break;
            case 505:
              err.message = 'HTTP版本不受支持(505)';
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
        } else {
          err.message = '连接服务器失败!'
        }
        this.$message.error(err.message);

      })
  })
}
export function post1(url, data = {}) {
  // 请求头
  axios.interceptors.request.use(function (config) {
    if (sessionStorage.getItem("token") != null) {
      config.headers.token = JSON.parse(sessionStorage.getItem('userInfo')).token;
      // config.headers.token = '21232F297A57A5A743894A0E4A801FC3';

    }
    return config;
  });
  // 返回值
  axios.interceptors.response.use(function (response) {
    if (response.data.code == '0002') {
      router.push({
        path: '/components/commen/login',
      })
    }
    return response;
  });
  return new Promise((resolve, reject) => {
    let that = this;
    const loading = this.$loading({
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0)',
    });
    axios({
      method: "post",
      // url: '/api/' + url,
      url: sessionStorage.getItem("IP1") + url,
      data: data,
      transformRequest: [
        function (oldData) {
          let newStr = '';
          for (let item in oldData) {
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
          }
          newStr = newStr.slice(0, -1);
          return newStr
        }
      ],
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
      .then(response => {
        loading.close();
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch(err => {
        loading.close();
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误(400)';
              break;
            case 401:
              err.message = '未授权，请重新登录(401)';
              break;
            case 403:
              err.message = '拒绝访问(403)';
              break;
            case 404:
              err.message = '请求出错(404)';
              break;
            case 408:
              err.message = '请求超时(408)';
              break;
            case 500:
              err.message = '服务器错误(500)';
              break;
            case 501:
              err.message = '服务未实现(501)';
              break;
            case 502:
              err.message = '网络错误(502)';
              break;
            case 503:
              err.message = '服务不可用(503)';
              break;
            case 504:
              err.message = '网络超时(504)';
              break;
            case 505:
              err.message = 'HTTP版本不受支持(505)';
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
          router.push({
            path: '/components/commen/login',
          })
        } else {
          err.message = '连接服务器失败!'
          router.push({
            path: '/components/commen/login',
          })
        }
        this.$message.error(err.message);
      })
  })
}
//post方法
export function post(url, data = {}) {
  // 请求头
  axios.interceptors.request.use(function (config) {
    if (sessionStorage.getItem("token") != null) {
      config.headers.token = JSON.parse(sessionStorage.getItem('userInfo')).token;
      // config.headers.token = '21232F297A57A5A743894A0E4A801FC3';

    }
    return config;
  });
  // 返回值
  axios.interceptors.response.use(function (response) {
    if (response.data.code == '0002') {
      router.push({
        path: '/components/commen/login',
      })
    }
    return response;
  });
  return new Promise((resolve, reject) => {
    let that = this;
    const loading = this.$loading({
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0)',
    });
    axios({
      method: "post",
      // url: '/api/' + url,
      url: sessionStorage.getItem("IP") + url,
      data: data,
      transformRequest: [
        function (oldData) {
          let newStr = '';
          for (let item in oldData) {
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
          }
          newStr = newStr.slice(0, -1);
          return newStr
        }
      ],
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
      .then(response => {
        loading.close();
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch(err => {
        loading.close();
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误(400)';
              break;
            case 401:
              err.message = '未授权，请重新登录(401)';
              break;
            case 403:
              err.message = '拒绝访问(403)';
              break;
            case 404:
              err.message = '请求出错(404)';
              break;
            case 408:
              err.message = '请求超时(408)';
              break;
            case 500:
              err.message = '服务器错误(500)';
              break;
            case 501:
              err.message = '服务未实现(501)';
              break;
            case 502:
              err.message = '网络错误(502)';
              break;
            case 503:
              err.message = '服务不可用(503)';
              break;
            case 504:
              err.message = '网络超时(504)';
              break;
            case 505:
              err.message = 'HTTP版本不受支持(505)';
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
          router.push({
            path: '/components/commen/login',
          })
        } else {
          err.message = '连接服务器失败!'
          router.push({
            path: '/components/commen/login',
          })
        }
        this.$message.error(err.message);
      })
  })
}

// upload方法
export function upload(url, data = {}) {
  // 请求头
  axios.interceptors.request.use(function (config) {
    if (sessionStorage.getItem("token") != null) {
      config.headers.token = JSON.parse(sessionStorage.getItem('userInfo')).token;
      // config.headers.token = '21232F297A57A5A743894A0E4A801FC3';

    }
    return config;
  });
  // 返回值
  axios.interceptors.response.use(function (response) {
    if (response.data.code == '0002') {
      router.push({
        path: '/components/commen/login',
      })
    }
    return response;
  });
  return new Promise((resolve, reject) => {
    let that = this;
    const loading = this.$loading({
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0)',
    });
    axios({
      method: "post",
      // url: '/api/' + url,
      url: sessionStorage.getItem("IP") + url,
      data: data,
      transformRequest: [
        function (oldData) {
          let newStr = '';
          for (let item in oldData) {
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
          }
          newStr = newStr.slice(0, -1);
          return newStr
        }
      ],
      headers: {
        "Content-type": "multipart/form-data",
      }
    })
      .then(response => {
        loading.close();
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch(err => {
        loading.close();
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误(400)';
              break;
            case 401:
              err.message = '未授权，请重新登录(401)';
              break;
            case 403:
              err.message = '拒绝访问(403)';
              break;
            case 404:
              err.message = '请求出错(404)';
              break;
            case 408:
              err.message = '请求超时(408)';
              break;
            case 500:
              err.message = '服务器错误(500)';
              break;
            case 501:
              err.message = '服务未实现(501)';
              break;
            case 502:
              err.message = '网络错误(502)';
              break;
            case 503:
              err.message = '服务不可用(503)';
              break;
            case 504:
              err.message = '网络超时(504)';
              break;
            case 505:
              err.message = 'HTTP版本不受支持(505)';
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
          router.push({
            path: '/components/commen/login',
          })
        } else {
          err.message = '连接服务器失败!'
        }
        this.$message.error(err.message);
      })
  })
}


//get方法
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    let that = this;
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
    });
    axios({
      method: "get",
      url: sessionStorage.getItem("IP") + url,
      query: data,
      transformRequest: [
        function (oldData) {
          let newStr = '';
          for (let item in oldData) {
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
          }
          newStr = newStr.slice(0, -1);
          return newStr
        }
      ],
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
      .then(response => {
        loading.close();
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(err => {
        loading.close();
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误(400)';
              break;
            case 401:
              err.message = '未授权，请重新登录(401)';
              break;
            case 403:
              err.message = '拒绝访问(403)';
              break;
            case 404:
              err.message = '请求出错(404)';
              break;
            case 408:
              err.message = '请求超时(408)';
              break;
            case 500:
              err.message = '服务器错误(500)';
              break;
            case 501:
              err.message = '服务未实现(501)';
              break;
            case 502:
              err.message = '网络错误(502)';
              break;
            case 503:
              err.message = '服务不可用(503)';
              break;
            case 504:
              err.message = '网络超时(504)';
              break;
            case 505:
              err.message = 'HTTP版本不受支持(505)';
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
        } else {
          err.message = '连接服务器失败!'
        }
        this.$message.error(err.message);

      })
  })
}