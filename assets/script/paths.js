export default {
  login: '/login',
  logout: '/logout',
  register: '/register',
  professors: '/professors',
  dashboard: '/',

  professor: id => `/professors/${id}`,
  students: '/students',
  examSessions: '/examSessions',
  student: id => `/students/${id}`
}
