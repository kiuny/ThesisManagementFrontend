import endpoints from 'assets/script/endpoints'

export const state = () => ({
  token: '',
  user: {},
  permissions: []
})

export const mutations = {
  storeUser(state, { user, permissions }) {
    state.user = user
    state.permissions = permissions
  },
  clearUser(state) {
    state.user = {}
    state.permissions = []
  }
}

export const actions = {
  login({ commit, dispatch }, credentials) {
    return this.$axios.$post(endpoints.login, credentials).then(() => dispatch('getUser'))
  },
  getUser({ commit, state }) {
    return this.$axios
      .$get(endpoints.user)
      .then(userWithPermissions => commit('storeUser', userWithPermissions))
      .then(() => this.commit('layout/setMenuEntriesFor', state.permissions))
  },
  logout({ commit }, fromAll) {
    return this.$axios
      .$post(endpoints.logout, { fromAll })
      .then(() => commit('clearUser'))
      .then(() => this.commit('layout/setDefaultMenuEntries'))
  }
}
