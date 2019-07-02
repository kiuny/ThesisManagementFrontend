<template>
  <v-text-field v-bind="attrs" :error-messages="errors" v-on="$listeners"></v-text-field>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    error: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('errors', ['fieldErrors']),
    errors() {
      if (!this.error) return []
      return this.fieldErrors[this.error] || []
    },
    attrs() {
      const { error, ...attrs } = this.$attrs
      return attrs
    }
  }
}
</script>

<style scoped></style>
