import axios from 'axios'
import { getToken } from './token'
import { request } from '@/types/request'

let cancel;
const CancelToken = axios.CancelToken
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})
service.interceptors.request.use(config => {
  config.headers.Authorization = getToken()
  return config;
},
  error => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面                
        case 403:
          // Toast({
          //   message: '登录过期，请重新登录',
          //   duration: 1000,
          //   forbidClick: true
          // });
          // 清除token
          // localStorage.removeItem('token');
          // store.commit('loginSuccess', null);
          // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          // setTimeout(() => {
          //   router.replace({
          //     path: '/login',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   });
          // }, 1000);
          break;

        // 404请求不存在
        case 404:
          // Toast({
          //   message: '网络请求不存在',
          //   duration: 1500,
          //   forbidClick: true
          // });
          break;
        // 其他错误，直接抛出错误提示
        default:
        // Toast({
        //   message: error.response.data.message,
        //   duration: 1500,
        //   forbidClick: true
        // });
      }
      return Promise.reject(error.response);
    }
  }
)

export default {
  get(url: string, params?: request.requestParams) {
    //promise示例
    //   axios.post('/user', {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   }); 
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params: params,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {  //axios返回的是一个promise对象
        resolve(res)  //resolve在promise执行器内部 
      }).catch(err => {
        console.log(err, '异常')
      })

    })
  },
  post(url: string, params: request.requestParams) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: params,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err, '异常')
      })
    })
  },
  dynamicType(url: string, type: 'get' | 'post' | 'put' | 'delete', params?: request.requestParams) {
    switch (type) {
      case 'get':
        return this.get(url, params)
      case 'post':
        return this.post(url, params!)
    }
  }
}