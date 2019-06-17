import Echo from 'laravel-echo'
require('pusher-js')

export default ({ env, store }, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: env.pusherKey,
    cluster: 'eu',
    encrypted: true,
    authEndpoint: '/api/broadcasting/auth',
    namespace: '',
    auth: {
      headers: {
        Authorization: {
          toString() {
            return localStorage.getItem('token')
          }
        },
        Accept: 'application/json'
      }
    }
  })
  // eslint-disable-next-line no-undef
  Pusher.logToConsole = true
  inject('echo', echo)
}
