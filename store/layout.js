import paths from 'assets/script/paths'
import entriesResolver from 'assets/script/menuEntriesResolver'

export const state = () => ({
  menuEntries: [],
  darkMode: localStorage.darkMode && localStorage.darkMode === 'true',
  drawerOpen: localStorage.drawerOpen && localStorage.drawerOpen === 'true'
})

export const mutations = {
  setMenuEntriesFor(state, permissions) {
    state.menuEntries = entriesResolver(permissions)
    state.menuEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  },
  setDefaultMenuEntries(state) {
    state.menuEntries = [
      {
        title: 'Login',
        icon: 'fa-sign-in-alt',
        to: paths.login,
        description: 'Login into the application'
      },
      {
        title: 'Register',
        icon: 'fa-user-plus',
        to: paths.register,
        description: "If you've been added to the application you can register with your email here"
      }
    ]
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode
    localStorage.darkMode = state.darkMode
  },
  toggleDrawer(state, value) {
    if (typeof value === 'boolean' && value === state.drawerOpen) {
      return
    }
    state.drawerOpen = !state.drawerOpen
    localStorage.drawerOpen = state.drawerOpen
  }
}
