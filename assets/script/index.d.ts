import Echo from 'laravel-echo/dist/types/echo'
import Endpoints from './endpoints'

declare module 'vuex/types/index' {
  interface Vue {
    $echo: Echo
    $endpoint: Endpoints
  }
}
