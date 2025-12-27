import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { mockData } from './mockData'

// 是否开启 Mock 模式 (当后端接口未完成时开启)
const USE_MOCK = false;

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8080',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // Mock 逻辑
    const mockKey = Object.keys(mockData).find(key => config.url && config.url.includes(key))
    if (USE_MOCK && mockKey) {
      console.log(`[Mock Request]: ${config.url}`, mockData[mockKey])
      
      let responseData = mockData[mockKey]
      
      // 特殊处理登录，根据用户名返回不同角色
       if (config.url === '/api/auth/login' && config.data) {
         try {
           const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
           const username = data.username
           if (username === 'student') {
             responseData = {
               code: 200,
               data: {
                 token: 'mock-token-student',
                 userInfo: {
                   id: 2,
                   username: 'student',
                   nickname: '普通学生',
                   role: 'user'
                 }
               },
               message: '登录成功'
             }
           }
         } catch (e) {
           console.error('Mock login parse error:', e)
         }
       }
      
      // 特殊处理获取个人信息，根据 token 返回不同角色
      if (config.url === '/api/auth/info') {
        const token = localStorage.getItem('token')
        if (token === 'mock-token-student') {
          responseData = {
            code: 200,
            data: {
              username: 'student',
              nickname: '普通学生',
              role: 'user',
              phone: '13900139000',
              email: 'student@example.com',
              intro: '我是一个爱读书的学生。'
            }
          }
        }
      }

      config.adapter = () => {
        return Promise.resolve({
          data: responseData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        })
      }
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 如果返回的状态码不是 200，则视为错误（根据实际后端接口约定修改）
    if (res.code !== 200 && res.code !== undefined) {
      ElMessage.error(res.message || '系统错误')
      return Promise.reject(new Error(res.message || '系统错误'))
    }
    return res
  },
  (error) => {
    console.error('响应错误：', error)
    const message = error.response?.data?.message || '网络连接异常'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service
