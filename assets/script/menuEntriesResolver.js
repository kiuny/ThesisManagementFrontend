import paths from 'assets/script/paths'

const menuEntries = {
  'Manage sessions': [
    {
      title: 'Exam sessions',
      icon: 'fa-graduation-cap',
      to: paths.examSessions,
      description: 'Manage the exam sessions that the users can interact with'
    }
  ],
  'Manage professors': [
    {
      title: 'Professors',
      icon: 'fa-chalkboard-teacher',
      to: paths.professors,
      description: 'Add new professors to the application. Or delete their accounts'
    }
  ],
  'Manage students': [
    {
      title: 'Students',
      icon: 'fa-user-graduate',
      to: paths.students,
      description: 'See all your supervised students'
    }
  ],
  'Manage thesis papers': [
    {
      title: 'Your thesis paper',
      icon: 'fa-archive',
      to: paths.paper,
      description: 'Upload paper revisions and talk with your supervisor'
    }
  ],
  'See evaluators': [
    {
      title: 'Evaluators',
      icon: 'fa-chalkboard-teacher',
      to: paths.evaluators,
      description: 'See who is going to be in your committee'
    }
  ],
  'Manage keywords': [
    {
      title: 'Domains of interest',
      icon: 'fa-highlighter',
      to: paths.domainsOfInterest,
      description: 'What are you interested in?'
    }
  ],

  'Manage committees': [
    {
      title: 'Committees',
      icon: 'fa-angry',
      to: paths.manageCommittees,
      description: 'Manage everything related to the committees for this exam session'
    }
  ],

  'Manage grading schemes': [
    {
      title: 'Grading scheme',
      icon: 'fa-angry',
      to: paths.manageGradingScheme,
      description: 'Set the grading criteria for this exam session'
    }
  ],

  Grade: [
    {
      title: 'Presentation day',
      icon: 'fa-tv',
      to: paths.liveGrading,
      description: 'Here you can grade the students during their presentations'
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
