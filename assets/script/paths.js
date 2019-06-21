export default {
  login: '/login',
  logout: '/logout',
  register: '/register',
  dashboard: '/',
  paper: '/paper',

  evaluators: '/evaluators',
  domainsOfInterest: '/interests',
  liveGrading: '/liveGrading',
  liveGradingPaper: id => `/liveGrading/${id}`,

  manageCommittees: '/committees',
  manageGradingScheme: '/gradingScheme',

  evaluator: id => `/evaluators/${id}`,

  professors: '/professors',
  professor: id => `/professors/${id}`,

  students: '/students',
  student: id => `/students/${id}`,

  examSessions: '/examSessions',
  session: id => `/examSessions/${id}`
}
