import request from './request'

// 登录
export const login = (data: any) => {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export const getInfo = () => {
  return request({
    url: '/api/auth/info',
    method: 'get'
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}

// 重置密码
export const resetPassword = (data: any) => {
  return request({
    url: '/api/auth/reset-password',
    method: 'post',
    data
  })
}

// 发送验证码
export const sendVerifyCode = (email: string) => {
  return request({
    url: '/api/auth/verify-code',
    method: 'post',
    data: { email }
  })
}
