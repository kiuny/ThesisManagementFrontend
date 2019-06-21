export default class {
  constructor(examSessionResolver) {
    this.examSessionResolver = examSessionResolver
  }

  get examSession() {
    return this.examSessionResolver()
  }

  user = '/user/me'

  login = '/auth/login'
  logout = '/auth/logout'
  register = '/auth/register'

  professors = {
    list: '/professors',
    get: id => `/professors/${id}`,
    create: '/professors',
    delete: id => `/professors/${id}`,

    reimport: id => `/professors/${id}/reimport`
  }

  students = {
    index: '/students',
    get: id => `/students/${id}`,
    create: '/students',
    delete: id => `/students/${id}`
  }

  domainsOfInterest = {
    get: id => `/doi/${id}`,
    create: '/doi',
    delete: id => `/doi/${id}`
  }

  finalReview = {
    get: paperId => `/review/${paperId}`,
    delete: paperId => `/review/${paperId}`,
    update: paperId => `/review/${paperId}`,
    download: paperId => `/review/${paperId}/download`
  }

  sessions = {
    create: '/sessions',
    list: '/sessions',
    delete: sessionId => `/sessions/${sessionId}`
  }

  gradingScheme = {
    get: () => `/sessions/${this.examSession}/gradingCategory/`,
    save: () => `/sessions/${this.examSession}/gradingCategory/`,
    update: gradingCategoryId => `/gradingCategory/${gradingCategoryId}`,
    deleteCategory: gradingCategoryId => `/gradingCategory/${gradingCategoryId}`,

    increment: gradingCategoryId => `/gradingCategory/${gradingCategoryId}/increment`,
    decrement: gradingCategoryId => `/gradingCategory/${gradingCategoryId}/decrement`
  }
  papers = {
    upload: paperId => `/revisions/${paperId}`,
    download: revisionId => `/revisions/${revisionId}/download`,

    getForStudent: studentId => `/papers/${this.examSession}/user/${studentId}`,
    updateDetails: () => `/papers/${this.examSession}`
  }
  comments = {
    getForRevision: revisionId => `/revisions/${revisionId}/messages`,
    sendMessage: revisionId => `/revisions/${revisionId}/messages`,
    update: commentId => `/comments/${commentId}`,
    delete: commentId => `/comments/${commentId}`
  }

  committees = {
    create: () => `/sessions/${this.examSession}/committee`,
    get: () => `/sessions/${this.examSession}/committee`,
    update: committeeId => `/committee/${committeeId}`,
    delete: committeeId => `/committee/${committeeId}`,
    randomAssign: () => `/sessions/${this.examSession}/randomOrder`,
    lexicalAssign: () => `/sessions/${this.examSession}/lexicalOrder`
  }

  liveGrading = {
    list: () => `/liveGrading/${this.examSession}/papers`,
    committee: () => `/liveGrading/${this.examSession}/committee`,
    paperData: paperId => `/liveGrading/papers/${paperId}`,
    grades: paperId => `/liveGrading/papers/${paperId}/grades`,
    setGrade: (paperId, categoryId) => `/liveGrading/papers/${paperId}/grades/${categoryId}`
  }
}
