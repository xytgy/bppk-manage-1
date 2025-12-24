<template>
  <div class="category-container">
    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span class="title">图书分类管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新增分类
          </el-button>
        </div>
      </template>

      <el-table :data="categories" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="分类名称" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.type">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="分类编码" align="center" />
        <el-table-column prop="bookCount" label="图书数量" align="center" />
        <el-table-column prop="description" label="备注说明" align="center" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" align="center" width="180" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '新增分类'"
      width="500px"
      @closed="resetForm"
    >
      <el-form :model="categoryForm" :rules="rules" ref="categoryFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类编码" prop="code">
          <el-input v-model="categoryForm.code" placeholder="请输入分类编码 (如: COMP)" />
        </el-form-item>
        <el-form-item label="标签颜色" prop="type">
          <el-select v-model="categoryForm.type" placeholder="请选择标签颜色" style="width: 100%">
            <el-option label="蓝色 (默认)" value="" />
            <el-option label="绿色 (成功)" value="success" />
            <el-option label="黄色 (警告)" value="warning" />
            <el-option label="红色 (危险)" value="danger" />
            <el-option label="灰色 (信息)" value="info" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="description">
          <el-input
            v-model="categoryForm.description"
            type="textarea"
            placeholder="请输入备注说明"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getCategoryList, addCategory, updateCategory, deleteCategory } from '@/api/category'
import type { Category } from '@/api/category'

// 扩展 Category 类型以包含 UI 需要的字段
interface CategoryUI extends Category {
  type: '' | 'success' | 'warning' | 'danger' | 'info'
  bookCount: number
}

// 模拟数据
const categories = ref<CategoryUI[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const categoryFormRef = ref<FormInstance>()

const categoryForm = reactive<CategoryUI>({
  name: '',
  code: '',
  type: '',
  bookCount: 0,
  description: '',
  createTime: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入分类编码', trigger: 'blur' }]
})

// 获取列表数据
const getList = async () => {
  loading.value = true
  try {
    // const res = await getCategoryList()
    // categories.value = res.data
    
    // 模拟数据
    setTimeout(() => {
      categories.value = [
        { id: 1, name: '计算机', code: 'COMP', type: '', bookCount: 450, description: '包含编程、算法、网络、人工智能等图书', createTime: '2023-01-10 10:00:00' },
        { id: 2, name: '文学', code: 'LIT', type: 'success', bookCount: 320, description: '包含小说、散文、诗歌、中外名著等', createTime: '2023-01-12 14:30:00' },
        { id: 3, name: '历史', code: 'HIST', type: 'warning', bookCount: 180, description: '包含通史、断代史、人物传记等', createTime: '2023-02-05 09:15:00' },
        { id: 4, name: '艺术', code: 'ART', type: 'danger', bookCount: 120, description: '包含设计、绘画、音乐、建筑等', createTime: '2023-03-20 16:40:00' },
        { id: 5, name: '科学', code: 'SCI', type: 'info', bookCount: 95, description: '包含物理、化学、生物、天文等科普读物', createTime: '2023-04-15 11:20:00' }
      ]
      loading.value = false
    }, 500)
  } catch (error) {
    loading.value = false
  }
}

onMounted(() => {
  getList()
})

const handleAdd = () => {
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: CategoryUI) => {
  isEdit.value = true
  Object.assign(categoryForm, row)
  dialogVisible.value = true
}

const handleDelete = (row: CategoryUI) => {
  if (!row.id) return
  ElMessageBox.confirm(`确定要删除分类 "${row.name}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      // await deleteCategory(row.id)
      const index = categories.value.findIndex(c => c.id === row.id)
      if (index !== -1) {
        categories.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
    } catch (error) {}
  })
}

const resetForm = () => {
  categoryFormRef.value?.resetFields()
  Object.assign(categoryForm, {
    id: undefined,
    name: '',
    code: '',
    type: '',
    bookCount: 0,
    description: '',
    createTime: ''
  })
}

const submitForm = async () => {
  if (!categoryFormRef.value) return
  await categoryFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEdit.value) {
          if (!categoryForm.id) return
          // await updateCategory(categoryForm.id, categoryForm)
          const index = categories.value.findIndex(c => c.id === categoryForm.id)
          if (index !== -1) {
            categories.value[index] = { ...categoryForm }
            ElMessage.success('修改成功')
          }
        } else {
          // await addCategory(categoryForm)
          const newCategory = {
            ...categoryForm,
            id: Date.now(),
            bookCount: 0,
            createTime: new Date().toLocaleString()
          }
          categories.value.push(newCategory)
          ElMessage.success('新增成功')
        }
        dialogVisible.value = false
      } catch (error) {}
    }
  })
}
</script>

<style scoped>
.category-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header .title {
  font-weight: bold;
  font-size: 16px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
