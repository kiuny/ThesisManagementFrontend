export default {
  login: '/auth/login',
  logout: '/auth/logout',
  user: '/user/me',

  professors: {
    index: '/professors',
    create: '/professors',
    delete: id => `/professor/${id}`,
    toggleCoordinator: id => `/professor/${id}/toggle/coordinator`,
    toggleEvaluator: id => `/professor/${id}/toggle/evaluator`
  }
}
