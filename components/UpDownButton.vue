<template>
  <div>
    <v-btn icon @click="$emit('up')"><v-icon>fa-chevron-up</v-icon></v-btn>
    <v-btn icon @click="$emit('down')"><v-icon>fa-chevron-down</v-icon></v-btn>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
div {
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
div > * {
  flex-grow: 0;
  flex-shrink: 1;
}
</style>
