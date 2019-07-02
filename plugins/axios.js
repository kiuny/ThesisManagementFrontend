const extractAuthToken = headers => {
  if (headers.authorization) localStorage.token = headers.authorization
}

export default function({ $axios, app }) {
  $axios.onRequest(config => {
    if (config.url.startsWith('/')) {
      if (app.$echo && app.$echo.socketId()) {
        config.headers['X-Socket-Id'] = app.$echo.socketId()
      }
      const authToken = localStorage.token

      if (authToken) {
        config.headers.Authorization = authToken
      }
    }
  })
  $axios.onResponse(response => {
    if (response.config.url.startsWith('/')) extractAuthToken(response.headers)
  })
  $axios.onResponseError(({ response }) => {
    if (response.config.url.startsWith('/')) extractAuthToken(response.headers)
    app.store.commit(`errors/processResponse${response.status}`, response)
  })
}
