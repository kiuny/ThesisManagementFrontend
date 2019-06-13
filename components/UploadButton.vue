<template>
  <v-btn v-bind="$attrs" @click="forwardClick">
    {{ buttonLabel }}
    <input ref="uploadInput" type="file" hidden accept="application/pdf" @change="fileSelected" />
  </v-btn>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line
    value: {},
    label: {
      type: String,
      default: 'Upload'
    }
  },
  computed: {
    buttonLabel() {
      if (!this.value) {
        return 'Select a file'
      }
      return 'Selected: ' + this.value.name
    }
  },
  methods: {
    forwardClick() {
      this.$refs.uploadInput.click()
    },

    fileSelected(e) {
      this.$emit('input', e.target.files[0])
    }
  }
}
</script>

<style scoped></style>
