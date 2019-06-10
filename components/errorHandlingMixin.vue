<script>
export default {
  data() {
    return {
      errors: {}
    }
  },
  methods: {
    errorHandling(reason) {
      console.error(reason)
      const { response } = reason
      if (response.status === 403) {
        this.$notify({
          title: 'Forbidden',
          type: 'error',
          text: response.data.message
        })
      }
      if (response.status === 422) {
        this.errors = response.data.errors
      }
    },
    clearErrors(v) {
      this.errors = {}
      return v
    }
  }
}
</script>
