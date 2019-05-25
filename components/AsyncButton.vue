<template>
  <v-btn v-bind="$attrs" :loading="loading" v-on="$listeners" @click="run">
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    action: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async run() {
      this.loading = true
      await this.action()
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
