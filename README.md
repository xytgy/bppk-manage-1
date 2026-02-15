# 图书管理系统 (bppk-manage-1)

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

##  项目简介

**bppk-manage-1** 是一个基于 **Vue 3 + TypeScript + Element Plus** 构建的现代化图书管理系统前端项目。该系统专为高校、企业或个人图书馆设计，旨在提供高效、便捷的图书借阅与管理解决方案。

项目采用模块化架构，界面简洁美观，交互体验流畅，内置了完整的用户权限管理体系，能够满足管理员与普通读者的日常使用需求。

---

##  主要功能特性

- ** 图书全生命周期管理**
  - 图书录入、编辑、下架与删除
  - 支持 ISBN 扫码查询与模糊搜索
  - 图书分类管理与库存实时监控

- ** 借阅与归还系统**
  - 在线借阅申请与审批流程
  - 逾期自动提醒与罚款记录
  - 个人借阅历史查询与状态追踪

- ** 用户与权限中心**
  - **多角色支持**：超级管理员、图书管理员、普通用户（学生/职工）
  - 用户注册、登录（JWT 认证）与密码找回
  - 个人资料管理与头像裁剪上传（集成 vue-cropper）

- ** 数据可视化大屏**
  - 基于 ECharts 的借阅趋势分析
  - 热门图书排行榜与分类统计
  - 馆藏数据实时概览

---

##  安装与配置指南

### 1. 环境要求
- **Node.js**: v16.0.0+ (推荐 v18 LTS)
- **npm**: v8.0.0+ 或 **yarn**: v1.22+
- **后端服务**: 需自行部署配套后端 API 服务（默认端口 8888）

### 2. 获取代码
```bash
git clone https://github.com/xytgy/bppk-manage-1.git
cd bppk-manage-1
```

### 3. 安装依赖
```bash
npm install
# 或者
yarn install
```

### 4. 项目配置
在项目根目录下创建或修改 `.env` 文件（可选），配置后端接口地址：
```properties
# .env.development
VUE_APP_BASE_API=http://localhost:8888
```

---

##  快速开始

### 启动开发服务器
```bash
npm run serve
```
启动成功后，访问 `http://localhost:9090` 即可进入系统。

### 构建生产环境代码
```bash
npm run build
```
构建产物将输出至 `dist/` 目录，可直接部署到 Nginx 或 Apache 服务器。

### 代码规范检查
```bash
npm run lint
```

---

##  API 接口文档

本项目遵循 RESTful API 设计规范。完整的接口定义已包含在 `api-docs.json` 文件中，您可以直接导入 **Apifox** 或 **Postman** 进行调试。

| 模块 | 基础路径 | 描述 |
| --- | --- | --- |
| **认证** | `/api/auth` | 登录、注册、个人信息获取 |
| **图书** | `/api/book` | 图书增删改查 |
| **借阅** | `/api/borrow` | 借还书操作 |
| **分类** | `/api/category` | 图书分类管理 |
| **用户** | `/api/user` | 用户信息管理（管理员） |

---

##  Docker 部署指南

本项目包含 `Dockerfile`，支持容器化部署。

1. **构建镜像**
```bash
docker build -t bppk-manage-frontend .
```

2. **运行容器**
```bash
docker run -d -p 80:80 --name book-manage bppk-manage-frontend
```
访问 `http://localhost` 即可使用。

---

##  贡献指南

我们非常欢迎社区贡献！请遵循以下步骤：

1. **Fork** 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 **Pull Request**

---

##  许可证

本项目基于 [MIT 许可证](LICENSE) 开源。这意味着您可以免费使用、复制、修改、合并、出版发行、散布、再授权及贩售软件及其副本。

---

##  问题反馈

如果您在使用过程中遇到任何问题，或有任何建议，欢迎通过以下方式联系我们：

- **Issues**: [GitHub Issues](https://github.com/xytgy/bppk-manage-1/issues)

---

##  常见问题 (FAQ)

**Q: 启动后页面显示 404 或白屏？**
A: 请检查路由模式设置（默认 Hash 模式），并确保 `vue.config.js` 中的 `publicPath` 配置正确。

**Q: 登录接口请求失败？**
A: 请确保后端服务已启动，并检查 `.env` 文件中的 `VUE_APP_BASE_API` 是否指向正确的后端地址。如遇跨域问题，需在后端配置 CORS 或在 `vue.config.js` 中配置 `proxy`。

**Q: 依赖安装报错？**
A: 建议删除 `node_modules` 和 `package-lock.json` 后，使用 `npm install --registry=https://registry.npmmirror.com` 重新安装。
