/*
 * @Descripttion: 
 * @Author: 
 * @Date: 2020-10-17 16:02:14
 * @LastEditors: Cheng
 * @LastEditTime: 2021-05-25 16:59:02
 */
import Vue from 'vue'
import axios from 'axios'
// import store from '../store/index'

let vm = new Vue()

const errorData = {
  '400': '请求错误',
  '401': '登录失败',
  '403': '拒绝访问',
  '404': '请求地址出错',
  '408': '请求超时',
  '500': '服务器内部错误',
  '501': '服务未实现',
  '502': '网关错误',
  '503': '服务不可用',
  '504': '网关超时',
  '505': 'HTTP版本不受支持',
}

// 设置后可将cookie回传给后台（可能）
axios.defaults.withCredentials = true;
const service = axios.create({
  // 演示和生成环境手动设置baseUrl、开发环境在vue.config中配置有proxy
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '',
  timeout: 5000
})

// axios请求拦截器
// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       // 让每个请求携带令牌
//       config.headers['token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// axios响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.code === 0) {
    //   return res.data
    // } else {
    //   vm.$message.error(res.errorMsg)
    //   if ((res.code === 1) || (res.code === 2)) {
    //     store.dispatch('user/logout')
    //   }
    //   return Promise.reject(new Error(res.errorMsg))
    // }
  },
  error => {
    let message = ''
    if (error.response) {
      message = errorData[error.response.status] || '连接服务器异常'
    } else {
      message = '连接服务器失败'
    }
    vm.$message.error(message)
    return Promise.reject(error)
  }
)

export default service