import request from './request'

export interface User {
  id?: number
  username: string
  nickname: string
  role: string
  status: number
  createTime?: string
  password?: string
}

export interface UserQuery {
  username?: string
  role?: string
  pageNum?: number
  pageSize?: number
}

// 获取用户列表
export const getUserList = (params?: UserQuery) => {
  return request({
    url: '/api/users',
    method: 'get',
    params
  })
}

// 新增用户
export const addUser = (data: User) => {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

// 更新用户
export const updateUser = (id: number, data: Partial<User>) => {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request({
    url: `/api/users/${id}`,
    method: 'delete'
  })
}

// 更新用户状态
export const updateUserStatus = (id: number, status: number) => {
  return request({
    url: `/api/users/${id}/status`,
    method: 'patch',
    data: { status }
  })
}
