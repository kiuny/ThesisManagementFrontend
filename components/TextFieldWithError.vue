<template>
  <v-text-field v-bind="attrs" :error-messages="errors" v-on="$listeners"></v-text-field>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

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
  },
  beforeDestroy() {
    this.clearError(this.error)
  },
  methods: {
    ...mapMutations('errors', ['clearError'])
  }
}
</script>

<style scoped></style>
