export default {
  login: '/login',
  logout: '/logout',
  register: '/register',
  dashboard: '/',
  paper: '/paper',

  evaluators: '/evaluators',
  evaluator: id => `/evaluators/${id}`,

  professors: '/professors',
  professor: id => `/professors/${id}`,

  students: '/students',
  student: id => `/students/${id}`,

  examSessions: '/examSessions',
  session: id => `/examSessions/${id}`
}
