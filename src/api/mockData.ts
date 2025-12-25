export const mockData: Record<string, any> = {
  '/api/statistics': {
    code: 200,
    data: {
      totalBooks: 1560,
      totalUsers: 485,
      currentBorrows: 92,
      overdueBorrows: 15
    }
  },
  '/api/auth/info': {
    code: 200,
    data: {
      username: 'admin',
      nickname: '高级管理员',
      role: 'admin',
      phone: '13800138000',
      email: 'admin@example.com',
      intro: '这是模拟的个人简介，系统运行在 Mock 模式下。'
    }
  },
  '/api/books': {
    code: 200,
    data: [
      { id: 1, isbn: '9787115428028', title: 'Vue.js 设计与实现', author: '霍春阳', categoryName: '计算机', publisher: '人民邮电出版社', stock: 10, price: 119.8, publishDate: '2022-02-01' },
      { id: 2, isbn: '9787121362132', title: '深入理解 TypeScript', author: 'Basarat', categoryName: '计算机', publisher: '电子工业出版社', stock: 5, price: 89.0, publishDate: '2019-06-01' },
      { id: 3, isbn: '9787111606789', title: '算法导论', author: 'Thomas H. Cormen', categoryName: '计算机', publisher: '机械工业出版社', stock: 3, price: 128.0, publishDate: '2013-01-01' }
    ]
  },
  '/api/borrows': {
    code: 200,
    data: [
      { id: 1, bookId: 1, bookTitle: 'Vue.js 设计与实现', userId: 1, username: '张三', borrowDate: '2023-12-20', dueDate: '2024-01-20', status: 0 },
      { id: 2, bookId: 2, bookTitle: '深入理解 TypeScript', userId: 2, username: '李四', borrowDate: '2023-12-15', dueDate: '2024-01-15', status: 1, returnDate: '2023-12-25' },
      { id: 3, bookId: 3, bookTitle: '算法导论', userId: 1, username: '张三', borrowDate: '2023-12-01', dueDate: '2023-12-31', status: 2 }
    ]
  },
  '/api/borrows/recent': {
    code: 200,
    data: [
      { borrower: '王五', bookName: 'JavaScript 高级程序设计', borrowDate: '2023-12-25', status: '借阅中' },
      { borrower: '赵六', bookName: '重构 改善既有代码的设计', borrowDate: '2023-12-24', status: '已归还' },
      { borrower: '陈七', bookName: '代码整洁之道', borrowDate: '2023-12-23', status: '借阅中' }
    ]
  },
  '/api/categories': {
    code: 200,
    data: [
      { id: 1, name: '计算机' },
      { id: 2, name: '文学' },
      { id: 3, name: '历史' },
      { id: 4, name: '艺术' },
      { id: 5, name: '其他' }
    ]
  }
}
