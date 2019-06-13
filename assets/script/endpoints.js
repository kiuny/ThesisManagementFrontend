export default {
  login: '/auth/login',
  logout: '/auth/logout',
  user: '/user/me',
  register: '/auth/register',

  professors: {
    index: '/professors',
    get: id => `/professors/${id}`,
    create: '/professors',
    delete: id => `/professors/${id}`,
    reimport: id => `/professors/${id}/reimport`,
    toggleCoordinator: id => `/professors/${id}/toggle/coordinator`,
    toggleEvaluator: id => `/professors/${id}/toggle/evaluator`
  },

  students: {
    index: '/students',
    getAll: '/students/all',
    get: id => `/students/${id}`,
    create: '/students',
    delete: id => `/students/${id}`
  },

  sessions: {
    create: '/sessions',
    index: '/sessions',
    delete: id => `/sessions/${id}`
  },

  gradingScheme: {
    getCategories: examSession => `/sessions/${examSession}/gradingCategory`,
    save: examSession => `/sessions/${examSession}/gradingCategory/`,
    update: id => `/gradingCategory/${id}`,
    deleteCategory: id => `/gradingCategory/${id}`,
    increment: id => `/gradingCategory/${id}/increment`,
    decrement: id => `/gradingCategory/${id}/decrement`
  },

  papers: {
    getMine: '/papers/mine',
    upload: '/papers',
    download: id => `papers/${id}/download`,
    getForUser: id => `papers/user/${id}`
  },
  comments: {
    getForPapeer: id => `/papers/${id}/messages`,
    sendMessage: id => `/papers/${id}/messages`,
    edit: id => `/comments/${id}`,
    delete: id => `/comments/${id}`
  }
}
