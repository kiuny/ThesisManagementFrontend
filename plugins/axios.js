const addAuthToken = config => {
  const authToken = localStorage.token

  if (authToken) {
    config.headers.Authorization = authToken
  }
  return config
}

const extractAuthToken = headers => {
  const authToken = headers.authorization
  if (authToken) {
    localStorage.token = authToken
  }
}

export default function({ $axios }) {
  $axios.interceptors.request.use(addAuthToken)
  $axios.interceptors.response.use(
    response => {
      extractAuthToken(response.headers)
      return response
    },
    reason => {
      extractAuthToken(reason.response.headers)
      throw reason
    }
  )
}
