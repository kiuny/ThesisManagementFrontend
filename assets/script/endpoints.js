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
  }
}
