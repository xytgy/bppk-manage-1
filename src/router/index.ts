import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import MainLayout from '../layout/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/login/ForgotPassword.vue'),
    meta: { title: '找回密码' }
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '数据统计', roles: ['admin', 'student', 'user'] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/user/index.vue'),
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: 'book',
        name: 'Book',
        component: () => import('../views/book/index.vue'),
        meta: { title: '图书管理', roles: ['admin'] }
      },
      {
        path: 'hot-books',
        name: 'HotBooks',
        component: () => import('../views/book/HotBooks.vue'),
        meta: { title: '热门图书', roles: ['admin'] }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/category/index.vue'),
        meta: { title: '分类管理', roles: ['admin'] }
      },
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('../views/borrow/index.vue'),
        meta: { title: '借阅管理', roles: ['admin', 'student', 'user'] }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '个人中心', roles: ['admin', 'student', 'user'] }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  
  if (to.path === '/login' || to.path === '/forgot-password') {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      // 权限校验
      if (to.meta.roles) {
        const roles = to.meta.roles as string[]
        if (roles.includes(userInfo.role)) {
          next()
        } else {
          // 无权限，跳转到默认页面或提示
          ElMessage.error('抱歉，您没有权限访问该页面')
          next(from.path || '/')
        }
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})

export default router
