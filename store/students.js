import Vue from 'vue'

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
    commit('storeStudents', await this.$axios.$get(this.$endpoint.students.index))
  },

  async loadStudent({ commit }, id) {
    commit('storeStudent', await this.$axios.$get(this.$endpoint.students.get(id)))
  }
}
