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
      title: 'Your thesis paper',
      icon: 'fa-archive',
      to: paths.paper
    }
  ],
  'See evaluators': [
    {
      title: 'Evaluators',
      icon: 'fa-chalkboard-teacher',
      to: paths.evaluators
    }
  ],
  'Manage keywords': [
    {
      title: 'Domains of interest',
      icon: 'fa-highlighter',
      to: paths.domainsOfInterest
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
