import Endpoints from '../assets/script/endpoints'

export default ({ store }, inject) => {
  const endpoints = new Endpoints(() => store.state.currentSession.session)

  inject('endpoint', endpoints)
}
