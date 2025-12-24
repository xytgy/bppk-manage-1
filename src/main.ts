import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
// 1. 新增：导入所有 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 2. 新增：导入路由实例
import router from './router'

const app = createApp(App)

// 3. 新增：全局注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册 ElementPlus
app.use(ElementPlus)

// 全局挂载Axios
app.config.globalProperties.$axios = axios
// 配置后端接口基础路径（根据你的后端地址修改）
axios.defaults.baseURL = 'http://localhost:8080'

// 4. 新增：挂载路由（必须在 mount 之前）
app.use(router)

app.mount('#app')