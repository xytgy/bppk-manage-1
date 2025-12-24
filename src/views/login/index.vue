<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="../../assets/logo.png" alt="logo" class="logo" />
        <h2 class="title">图书管理系统</h2>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" size="large">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名: admin">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码: admin123"
            show-password
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-options">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <el-button link type="primary" @click="router.push('/forgot-password')">忘记密码？</el-button>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登 录' }}
        </el-button>
      </el-form>
      <div class="login-footer">
        <p>管理员: admin / admin123</p>
        <p>学生: student / 123456</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/auth'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 实际调用接口
        // const res = await login(loginForm)
        // const { token, userInfo } = res.data
        
        // 模拟登录请求
        setTimeout(() => {
          let userInfo = null
          if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
            userInfo = {
              username: 'admin',
              nickname: '超级管理员',
              role: 'admin'
            }
          } else if (loginForm.username === 'student' && loginForm.password === '123456') {
            userInfo = {
              username: 'student',
              nickname: '张同学',
              role: 'student'
            }
          }

          if (userInfo) {
            localStorage.setItem('token', `${userInfo.role}-token`)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            
            ElMessage.success('登录成功')
            // 学生账号直接去借阅管理
            if (userInfo.role === 'student') {
              router.push('/borrow')
            } else {
              router.push('/')
            }
          } else {
            ElMessage.error('用户名或密码错误')
          }
          loading.value = false
        }, 1000)
      } catch (error) {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  background-image: linear-gradient(180deg, #2d3a4b 0%, #1a242f 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header .logo {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
}

.login-header .title {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  letter-spacing: 2px;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  background-color: #f5f7fa;
}
</style>
