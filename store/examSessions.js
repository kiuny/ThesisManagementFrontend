import Vue from 'vue'
import endpoints from '../assets/script/endpoints'

export const state = () => ({
  examSessions: {}
})

export const getters = {
  getExamSession: state => name => state.examSessions[name]
}

export const mutations = {
  storeExamSessions(state, examSessions) {
    state.examSessions = examSessions
  },
  storeExamSession(state, examSession) {
    Vue.set(state.examSessions, examSession.name, examSession)
  },
  deleteExamSession(state, name) {
    Vue.delete(state.examSessions, name)
  }
}

export const actions = {
  async loadExamSessions({ commit }) {
    commit('storeExamSessions', await this.$axios.$get(endpoints.sessions.index))
    this.$echo
      .private('examSessions')
      .listen('ExamSessionUpdated', ({ examSession }) => commit('storeExamSession', examSession))
      .listen('ExamSessionDeleted', ({ name }) => commit('deleteExamSession', name))
  },

  async loadExamSession({ commit }, id) {
    commit('storeExamSession', await this.$axios.$get(endpoints.sessions.get(id)))
  }
}
