import paths from 'assets/script/paths'

const menuEntries = {
  'Manage sessions': [
    {
      title: 'Exam sessions',
      icon: 'fa-graduation-cap',
      to: paths.examSessions
    }
  ],
  'Manage professors': [
    {
      title: 'Professors',
      icon: 'fa-chalkboard-teacher',
      to: paths.professors
    }
  ],
  'Manage students': [
    {
      title: 'Students',
      icon: 'fa-user-graduate',
      to: paths.students
    }
  ],
  'Manage thesis papers': [
    {
      title: 'Thesis papers',
      icon: 'fa-archive',
      to: paths.papers
    }
  ]
}

const logout = {
  title: 'Logout',
  icon: 'fa-sign-out-alt',
  to: paths.logout,
  priority: -1
}

export default function resolve(permissions) {
  const entries = permissions.flatMap(p => menuEntries[p] || [])
  entries.push(logout)

  return entries
}
