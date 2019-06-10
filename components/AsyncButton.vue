<template>
  <v-btn v-bind="$attrs" :loading="loading" @click.stop="run" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async run() {
      this.loading = true
      this.$emit('click', () => (this.loading = false))
    }
  }
}
</script>

<style scoped></style>
