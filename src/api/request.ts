import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { mockData } from './mockData'

// 是否开启 Mock 模式 (当后端接口未完成时开启)
const USE_MOCK = true

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8080',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // Mock 逻辑
    if (USE_MOCK && mockData[config.url]) {
      console.log(`[Mock Request]: ${config.url}`, mockData[config.url])
      // 返回一个立即成功的 Promise，并携带 Mock 数据
      // 注意：axios 拦截器返回 Promise.reject 会进入响应拦截器的 error，
      // 但我们需要它成功，所以这里直接在 adapter 层或者通过逻辑绕过。
      // 最简单的方法是给 config 加上一个特殊标记。
      config.adapter = () => {
        return Promise.resolve({
          data: mockData[config.url],
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
