import Vue from 'vue'
import endpoints from '../assets/script/endpoints'

export const state = () => ({
  students: {}
})

export const getters = {
  getStudent: state => id => state.students[id]
}

export const mutations = {
  storeStudents(state, students) {
    Vue.set(state, 'students', students)
  },
  storeStudent(state, student) {
    Vue.set(state.students, student.id, student)
  },

  deleteStudent(state, id) {
    Vue.delete(state.students, id)
  }
}

export const actions = {
  async loadStudents({ commit }) {
    commit('storeStudents', await this.$axios.$get(endpoints.students.index))
    this.$echo
      .private('students')
      .listen('StudentUpdated', ({ student }) => commit('storeStudent', student))
      .listen('StudentDeleted', ({ id }) => commit('storeStudent', id))
  },

  async loadStudent({ commit }, id) {
    commit('storeStudent', await this.$axios.$get(endpoints.students.get(id)))
  }
}
