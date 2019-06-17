import Echo from 'laravel-echo/dist/types/echo'

declare module 'vuex/types/index' {
  interface Vue {
    $echo: Echo
  }
}
