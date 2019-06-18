import Vue from 'vue'
import endpoints from '../assets/script/endpoints'

export const state = () => ({
  professors: {}
})

export const getters = {
  getProfessor: state => id => state.professors[id]
}

export const mutations = {
  storeProfessors(state, professors) {
    state.professors = professors
  },
  storeProfessor(state, professor) {
    Vue.set(state.professors, professor.id, professor)
  },
  deleteProfessor(state, id) {
    Vue.delete(state.professors, id)
  }
}

export const actions = {
  async loadProfessors({ commit }) {
    commit('storeProfessors', await this.$axios.$get(endpoints.professors.index))
    this.$echo
      .private('professors')
      .listen('ProfessorUpdated', ({ professor }) => commit('storeProfessor', professor))
      .listen('ProfessorDeleted', ({ id }) => commit('deleteProfessor', id))
  },

  async loadProfessor({ commit }, id) {
    commit('storeProfessor', await this.$axios.$get(endpoints.professors.get(id)))
  }
}
