export default function({ store }) {
  const authToken = localStorage.token
  if (authToken) {
    return store.dispatch('auth/getUser').catch(() => {
      localStorage.removeItem('token')
      return store.commit('layout/setDefaultMenuEntries')
    })
  }
  return store.commit('layout/setDefaultMenuEntries')
}
