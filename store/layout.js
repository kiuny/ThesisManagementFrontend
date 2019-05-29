import paths from 'assets/script/paths'
import entriesResolver from 'assets/script/menuEntriesResolver'

export const state = () => ({
  menuEntries: [],
  darkMode: localStorage.darkMode && localStorage.darkMode === 'true'
})

export const mutations = {
  setMenuEntriesFor(state, permissions) {
    state.menuEntries = []
    for (const permission of permissions) {
      state.menuEntries.push(...(entriesResolver[permission] || []))
    }
  },
  setDefaultMenuEntries(state) {
    state.menuEntries = [
      {
        title: 'Login',
        icon: 'fa-sign-in-alt',
        to: paths.login
      },
      {
        title: 'Register',
        icon: 'fa-user-plus',
        to: paths.register
      }
    ]
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode
    localStorage.darkMode = state.darkMode
  }
}
