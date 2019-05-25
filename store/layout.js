export const state = () => ({
  menuEntries: [
    {
      title: 'Login',
      icon: 'fa-sign-in-alt',
      to: '/login'
    },
    {
      title: 'Register',
      icon: 'fa-user-plus',
      to: '/register'
    }
  ],
  darkMode: true
})

export const mutations = {
  addMenuEntry(state, entry) {
    state.menuEntries.push(entry)
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode
  }
}
