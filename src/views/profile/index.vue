<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <!-- 个人信息卡片 -->
      <el-col :span="8">
        <el-card shadow="hover" class="profile-card">
          <div class="user-avatar">
            <el-avatar :size="100" :icon="UserFilled" />
          </div>
          <div class="user-info">
            <h3 class="nickname">{{ userInfo.nickname }}</h3>
            <p class="role-tag">
              <el-tag :type="userInfo.role === 'admin' ? 'danger' : 'success'">
                {{ userInfo.role === 'admin' ? '系统管理员' : '在校学生' }}
              </el-tag>
            </p>
          </div>
          <el-divider />
          <div class="user-details">
            <div class="detail-item">
              <el-icon><User /></el-icon>
              <span>用户名：{{ userInfo.username }}</span>
            </div>
            <div class="detail-item">
              <el-icon><Calendar /></el-icon>
              <span>注册时间：2023-12-24</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 修改资料/密码卡片 -->
      <el-col :span="16">
        <el-card shadow="hover">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="info">
              <el-form :model="infoForm" label-width="100px" style="max-width: 500px; margin-top: 20px">
                <el-form-item label="用户昵称">
                  <el-input v-model="infoForm.nickname" />
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="infoForm.phone" />
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input v-model="infoForm.email" />
                </el-form-item>
                <el-form-item label="个人简介">
                  <el-input v-model="infoForm.intro" type="textarea" :rows="3" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleUpdateInfo">保存修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="安全设置" name="security">
              <el-form :model="pwdForm" :rules="pwdRules" ref="pwdFormRef" label-width="100px" style="max-width: 500px; margin-top: 20px">
                <el-form-item label="旧密码" prop="oldPassword">
                  <el-input v-model="pwdForm.oldPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="pwdForm.newPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input v-model="pwdForm.confirmPassword" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleUpdatePwd">修改密码</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { User, UserFilled, Calendar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getInfo, resetPassword } from '@/api/auth'

const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))
const activeTab = ref('info')

const infoForm = reactive({
  nickname: userInfo.value.nickname,
  phone: '13800138000',
  email: userInfo.value.username + '@example.com',
  intro: '这个人很懒，什么都没写~'
})

const pwdForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const pwdFormRef = ref<FormInstance>()

const pwdRules = reactive<FormRules>({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule: unknown, value: string, callback: (error?: Error) => void) => {
        if (value !== pwdForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

onMounted(async () => {
  try {
    // const res = await getInfo()
    // userInfo.value = res.data
    // Object.assign(infoForm, {
    //   nickname: userInfo.value.nickname,
    //   ...
    // })
  } catch (error) {}
})

const handleUpdateInfo = async () => {
  try {
    // 模拟调用接口
    // await updateInfo(infoForm)
    userInfo.value.nickname = infoForm.nickname
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    ElMessage.success('基本资料更新成功')
  } catch (error) {}
}

const handleUpdatePwd = async () => {
  if (!pwdFormRef.value) return
  await pwdFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // await resetPassword({
        //   oldPassword: pwdForm.oldPassword,
        //   newPassword: pwdForm.newPassword
        // })
        ElMessage.success('密码修改成功，请重新登录')
      } catch (error) {}
    }
  })
}
</script>

<style scoped>
.profile-container {
  padding: 10px;
}

.profile-card {
  text-align: center;
  padding: 20px 0;
}

.user-avatar {
  margin-bottom: 20px;
}

.nickname {
  margin: 10px 0;
  font-size: 20px;
  color: #303133;
}

.role-tag {
  margin-bottom: 20px;
}

.user-details {
  text-align: left;
  padding: 0 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #606266;
  font-size: 14px;
}

.detail-item .el-icon {
  font-size: 16px;
  color: #909399;
}
</style>
