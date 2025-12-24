<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h2 class="error-title">页面未找到</h2>
      <p class="error-desc">
        抱歉，你所访问的页面不存在、已被移除或网址输入错误
      </p>
      <div class="btn-group">
        <button @click="goBack" class="back-btn">返回上一页</button>
        <router-link to="/" class="home-btn">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.not-found-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  width: 100%;
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: fadeUp 0.6s ease;
}

.error-code {
  font-size: 100px;
  font-weight: 800;
  color: #6c63ff;
  margin-bottom: 16px;
}

.error-title {
  font-size: 26px;
  color: #2d3748;
  margin-bottom: 12px;
}

.error-desc {
  font-size: 15px;
  color: #718096;
  line-height: 1.7;
  margin-bottom: 30px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.back-btn,
.home-btn {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  text-decoration: none;
}

.back-btn {
  background: #fff;
  color: #4a5568;
}

.back-btn:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.home-btn {
  background: #6c63ff;
  color: #fff;
  border: none;
}

.home-btn:hover {
  background: #5a54e0;
  transform: translateY(-2px);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 576px) {
  .error-code {
    font-size: 70px;
  }

  .error-title {
    font-size: 20px;
  }

  .not-found-content {
    padding: 30px 20px;
  }

  .btn-group {
    flex-direction: column;
    gap: 10px;
  }

  .back-btn,
  .home-btn {
    width: 100%;
  }
}
</style>