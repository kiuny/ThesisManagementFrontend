export const state = () => ({
  fieldErrors: {},
  alertMessage: ''
})

export const mutations = {
  clearError(state, error) {
    state.fieldErrors[error] = []
  },
  processResponse422(state, { data }) {
    console.error(JSON.stringify(data))
    state.alertMessage = data.message
    state.fieldErrors = data.errors
  },
  processResponse500(state, { data }) {},
  processResponse401(state, { data }) {},
  processResponse403(state, { data }) {}
}
