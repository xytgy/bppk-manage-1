<template>
  <div class="forgot-container">
    <div class="forgot-box">
      <div class="forgot-header">
        <h2 class="title">找回密码</h2>
        <p class="subtitle">请按照步骤重置您的账户密码</p>
      </div>

      <el-steps :active="activeStep" finish-status="success" align-center class="steps">
        <el-step title="身份验证" />
        <el-step title="重置密码" />
        <el-step title="完成" />
      </el-steps>

      <!-- 第一步：身份验证 -->
      <div v-if="activeStep === 0" class="step-content">
        <el-form :model="verifyForm" :rules="verifyRules" ref="verifyFormRef" size="large">
          <el-form-item prop="username">
            <el-input v-model="verifyForm.username" placeholder="请输入用户名">
              <template #prefix><el-icon><User /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="verifyForm.email" placeholder="请输入绑定的邮箱">
              <template #prefix><el-icon><Message /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="code-input">
              <el-input v-model="verifyForm.code" placeholder="验证码" />
              <el-button @click="sendCode" :disabled="!!timer" class="code-btn">
                {{ timer ? `${count}s后重发` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>
          <el-button type="primary" class="next-btn" @click="handleNextStep">下一步</el-button>
        </el-form>
      </div>

      <!-- 第二步：设置新密码 -->
      <div v-if="activeStep === 1" class="step-content">
        <el-form :model="resetForm" :rules="resetRules" ref="resetFormRef" size="large">
          <el-form-item prop="password">
            <el-input v-model="resetForm.password" type="password" placeholder="请输入新密码" show-password>
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="resetForm.confirmPassword" type="password" placeholder="请确认新密码" show-password>
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="next-btn" @click="handleReset">确认重置</el-button>
        </el-form>
      </div>

      <!-- 第三步：完成 -->
      <div v-if="activeStep === 2" class="step-content success-content">
        <el-result icon="success" title="重置成功" sub-title="您的密码已成功重置，请牢记新密码">
          <template #extra>
            <el-button type="primary" @click="goToLogin">返回登录</el-button>
          </template>
        </el-result>
      </div>

      <div class="back-to-login" v-if="activeStep < 2">
        <el-button link @click="goToLogin">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { sendVerifyCode, resetPassword } from '@/api/auth'

const router = useRouter()
const activeStep = ref(0)
const loading = ref(false)

// 验证码倒计时
const count = ref(60)
const timer = ref<ReturnType<typeof setInterval> | undefined>(undefined)

const sendCode = async () => {
  if (!verifyForm.email) {
    return ElMessage.warning('请先输入邮箱')
  }
  
  try {
    // await sendVerifyCode(verifyForm.email)
    ElMessage.success('验证码已发送至您的邮箱（模拟：1234）')
    timer.value = setInterval(() => {
      count.value--
      if (count.value <= 0) {
        if (timer.value) {
          clearInterval(timer.value)
        }
        timer.value = undefined
        count.value = 60
      }
    }, 1000)
  } catch (error) {}
}

// 第一步表单
const verifyFormRef = ref<FormInstance>()
const verifyForm = reactive({
  username: '',
  email: '',
  code: ''
})
const verifyRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 第二步表单
const resetFormRef = ref<FormInstance>()
const resetForm = reactive({
  password: '',
  confirmPassword: ''
})
const resetRules = reactive<FormRules>({
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: unknown, value: string, callback: (error?: Error) => void) => {
        if (value !== resetForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const handleNextStep = async () => {
  if (!verifyFormRef.value) return
  await verifyFormRef.value.validate((valid) => {
    if (valid) {
      if (verifyForm.code === '1234') {
        activeStep.value = 1
      } else {
        ElMessage.error('验证码错误')
      }
    }
  })
}

const handleReset = async () => {
  if (!resetFormRef.value) return
  await resetFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // await resetPassword({
        //   username: verifyForm.username,
        //   password: resetForm.password,
        //   code: verifyForm.code
        // })
        setTimeout(() => {
          activeStep.value = 2
          loading.value = false
        }, 1000)
      } catch (error) {
        loading.value = false
      }
    }
  })
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.forgot-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}

.forgot-box {
  width: 500px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.forgot-header {
  text-align: center;
  margin-bottom: 30px;
}

.forgot-header .title {
  font-size: 24px;
  color: #303133;
  margin-bottom: 10px;
}

.forgot-header .subtitle {
  font-size: 14px;
  color: #909399;
}

.steps {
  margin-bottom: 40px;
}

.step-content {
  padding: 0 20px;
}

.code-input {
  display: flex;
  gap: 10px;
}

.code-btn {
  width: 120px;
}

.next-btn {
  width: 100%;
  margin-top: 20px;
}

.back-to-login {
  margin-top: 20px;
  text-align: center;
}

.success-content {
  padding: 20px 0;
}
</style>
