export const state = () => ({
  session: localStorage.currentSelectedSession ? JSON.parse(localStorage.currentSelectedSession) : null
})

export const mutations = {
  updateSession(state, session) {
    state.session = session
    localStorage.currentSelectedSession = JSON.stringify(session)
  }
}
