<template>
  <div>
    <v-btn icon @click="$emit('up')">
      <v-hover>
        <v-icon slot-scope="{ hover }" :color="hover ? 'accent' : ''">fa-chevron-up</v-icon>
      </v-hover>
    </v-btn>
    <v-btn icon @click="$emit('down')">
      <v-hover>
        <v-icon slot-scope="{ hover }" :color="hover ? 'accent' : ''">fa-chevron-down</v-icon>
      </v-hover>
    </v-btn>
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
