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
  },

  students: {
    index: '/students',
    getAll: '/students/all',
    get: id => `/students/${id}`,
    create: '/students',
    delete: id => `/students/${id}`
  },
  finalReview: {
    get: id => `/review/${id}`,
    delete: id => `/review/${id}`,
    update: id => `/review/${id}`,
    download: id => `/review/${id}/download`
  },

  sessions: {
    create: '/sessions',
    index: '/sessions',
    delete: id => `/sessions/${id}`,
    get: id => `/sessions/${id}`
  },

  gradingScheme: {
    save: examSession => `/sessions/${examSession}/gradingCategory/`,
    update: id => `/gradingCategory/${id}`,
    deleteCategory: id => `/gradingCategory/${id}`,
    increment: id => `/gradingCategory/${id}/increment`,
    decrement: id => `/gradingCategory/${id}/decrement`
  },

  papers: {
    upload: '/revisions',
    download: id => `/revisions/${id}/download`,
    getForUser: id => `/papers/user/${id}`,
    updateDetails: '/papers'
  },
  comments: {
    getForRevision: id => `/revisions/${id}/messages`,
    sendMessage: id => `/revisions/${id}/messages`,
    update: id => `/comments/${id}`,
    delete: id => `/comments/${id}`
  },
  committees: {
    create: examSessionId => `/sessions/${examSessionId}/committee`,
    update: id => `committee/${id}`,
    delete: id => `committee/${id}`
  }
}
