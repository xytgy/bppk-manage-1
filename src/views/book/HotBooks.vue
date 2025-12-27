<template>
  <div class="hot-books-container">
    <div class="page-header">
      <h2 class="title">热门图书推荐</h2>
      <p class="subtitle">根据全校借阅热度实时更新</p>
    </div>

    <!-- 排行榜 Top 3 -->
    <el-row :gutter="20" class="top-ranking">
      <el-col :span="8" v-for="(book, index) in topThree" :key="book.id">
        <el-card shadow="hover" :class="['ranking-card', `rank-${index + 1}`]">
          <div class="rank-badge">Top {{ index + 1 }}</div>
          <div class="book-cover">
            <el-icon :size="60"><Notebook /></el-icon>
          </div>
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-stats">
              <el-rate v-model="book.rating" disabled show-score text-color="#ff9900" />
              <span class="borrow-count">🔥 {{ book.borrowCount }} 次借阅</span>
            </div>
            <el-button type="primary" plain class="action-btn" @click="handleBorrow(book)">立即借阅</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 热门列表 -->
    <el-row :gutter="20" class="book-grid">
      <el-col :span="6" v-for="book in otherHotBooks" :key="book.id" class="grid-item">
        <el-card shadow="hover" class="book-card">
          <div class="book-card-content">
            <div class="mini-cover">
              <el-icon :size="40"><Notebook /></el-icon>
            </div>
            <div class="mini-info">
              <h4 class="mini-title">{{ book.title }}</h4>
              <p class="mini-author">{{ book.author }}</p>
              <div class="mini-stats">
                <el-tag size="small" type="warning" effect="plain">{{ book.borrowCount }}次借阅</el-tag>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <el-button link type="primary" @click="handleBorrow(book)">借阅</el-button>
            <el-button link type="info">详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Notebook } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { borrowBook } from '@/api/borrow'

interface HotBook {
  id: number
  title: string
  author: string
  borrowCount: number
  rating: number
}

const hotBooks = ref<HotBook[]>([
  { id: 1, title: '深入理解计算机系统', author: 'Randal E. Bryant', borrowCount: 1250, rating: 4.9 },
  { id: 2, title: '算法导论', author: 'Thomas H. Cormen', borrowCount: 980, rating: 4.8 },
  { id: 3, title: 'JavaScript高级程序设计', author: 'Matt Frisbie', borrowCount: 850, rating: 4.7 },
  { id: 4, title: '设计模式的可复用性', author: 'Erich Gamma', borrowCount: 620, rating: 4.6 },
  { id: 5, title: '代码整洁之道', author: 'Robert C. Martin', borrowCount: 580, rating: 4.5 },
  { id: 6, title: '计算机网络：自顶向下方法', author: 'James Kurose', borrowCount: 520, rating: 4.5 },
  { id: 7, title: '数据库系统概念', author: 'Abraham Silberschatz', borrowCount: 480, rating: 4.4 },
  { id: 8, title: '编译原理', author: 'Alfred V. Aho', borrowCount: 450, rating: 4.3 },
  { id: 9, title: '操作系统概念', author: 'Abraham Silberschatz', borrowCount: 420, rating: 4.2 },
  { id: 10, title: '人月神话', author: 'Fred Brooks', borrowCount: 390, rating: 4.1 },
  { id: 11, title: '重构：改善既有代码的设计', author: 'Martin Fowler', borrowCount: 350, rating: 4.6 }
])

const topThree = computed(() => hotBooks.value.slice(0, 3))
const otherHotBooks = computed(() => hotBooks.value.slice(3))

const handleBorrow = (book: HotBook) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  ElMessageBox.confirm(`确定要借阅《${book.title}》吗？`, '借阅确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  }).then(async () => {
    try {
      // 调用真实后端接口
      await borrowBook({
        userId: userInfo.id,
        bookId: book.id
      })
      ElMessage.success(`《${book.title}》借阅成功！请前往“借阅管理”查看。`)
    } catch (error: any) {
      ElMessage.error(error.response?.data?.msg || '借阅失败')
    }
  })
}
</script>

<style scoped>
.hot-books-container {
  padding: 10px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header .title {
  font-size: 24px;
  color: #303133;
  margin-bottom: 10px;
}

.page-header .subtitle {
  color: #909399;
  font-size: 14px;
}

.top-ranking {
  margin-bottom: 40px;
}

.ranking-card {
  position: relative;
  text-align: center;
  padding: 20px 0;
  border: none;
  transition: transform 0.3s;
}

.ranking-card:hover {
  transform: translateY(-5px);
}

.rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 12px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.rank-1 { background: linear-gradient(135deg, #fff9e6 0%, #fff2cc 100%); border: 1px solid #ffd966; }
.rank-1 .rank-badge { background: #f1c40f; }

.rank-2 { background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); border: 1px solid #d9d9d9; }
.rank-2 .rank-badge { background: #95a5a6; }

.rank-3 { background: linear-gradient(135deg, #fdf5e6 0%, #faebd7 100%); border: 1px solid #e6b17e; }
.rank-3 .rank-badge { background: #d35400; }

.book-cover {
  margin: 20px 0;
  color: #909399;
}

.rank-1 .book-cover { color: #f1c40f; }

.book-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #303133;
}

.book-author {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.book-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.borrow-count {
  font-size: 13px;
  color: #e6a23c;
  font-weight: bold;
}

.action-btn {
  width: 120px;
}

.book-grid {
  margin-top: 20px;
}

.grid-item {
  margin-bottom: 20px;
}

.book-card {
  height: 100%;
}

.book-card-content {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.mini-cover {
  width: 60px;
  height: 80px;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #c0c4cc;
}

.mini-info {
  flex: 1;
}

.mini-title {
  font-size: 14px;
  margin: 0 0 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-author {
  font-size: 12px;
  color: #909399;
  margin: 0 0 8px 0;
}

.card-footer {
  border-top: 1px solid #f2f6fc;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
