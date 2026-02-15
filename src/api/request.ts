import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8888',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
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
    // 如果返回的状态码不是 200，则视为错误
    if (res.code !== 200 && res.code !== undefined) {
      const errorMsg = res.msg || res.message || '系统错误'
      
      if (res.code === 400) {
        // 业务拦截：显示警告通知
        ElMessage.warning(errorMsg)
      } else {
        // 其他错误：显示错误提示
        ElMessage.error(errorMsg)
      }
      return Promise.reject(new Error(errorMsg))
    }
    return res
  },
  (error) => {
    console.error('响应错误：', error)
    const res = error.response?.data
    const message = res?.msg || res?.message || '网络连接异常'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service
