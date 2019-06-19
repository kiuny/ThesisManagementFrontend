const addAuthToken = config => {
  const authToken = localStorage.token

  if (authToken) {
    config.headers.Authorization = authToken
  }
}

const extractAuthToken = headers => {
  if (headers.authorization) localStorage.token = headers.authorization
}

export default function({ $axios }) {
  $axios.onRequest(config => {
    if (config.url.startsWith('/')) addAuthToken(config)
  })
  $axios.onResponse(response => {
    if (response.config.url.startsWith('/')) extractAuthToken(response.headers)
  })
  $axios.onResponseError(response => {
    if (response.config.url.startsWith('/')) extractAuthToken(response.headers)
  })
}
