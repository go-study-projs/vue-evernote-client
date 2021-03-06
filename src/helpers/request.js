import axios from 'axios'
import baseURLConfig from './config-baseURL'
import { Message } from 'element-ui'
import router from '../router'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = baseURLConfig.baseURL
// axios.defaults.withCredentials = true // 使用跨域请求

axios.interceptors.request.use(
  function (config) {
    const token =
      localStorage.getItem('auth-token') === ''
        ? 'token'
        : localStorage.getItem('auth-token')
    config.headers.Authorization = 'Bearer ' + token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method: type,
      validateStatus(status) {
        return (
          (status >= 200 && status < 300) || status === 400 || status === 401
        )
      }
    }

    if (type.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }

    axios(options)
      .then(res => {
        if (res.status >= 200 && res.status < 400) {
          resolve(res.data)
        } else {
          Message.error(res.data.msg)
          reject(res.data)
        }

        if (res.status === 401) {
          // 说明 token 验证失败
          // 可以直接跳转到登录页面，重新登录获取 token
          Message.error('请重新登陆')
          router.push('login')
        }
      })
      .catch(res => {
        console.log(res)
        Message.error('网络异常')
        reject({ msg: '网络异常' })
      })
  })
}
