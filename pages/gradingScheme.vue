<template>
  <v-container mt-2>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <GradingScheme></GradingScheme>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GradingScheme from '../components/GradingScheme'
export default {
  components: { GradingScheme }
}
</script>

<style scoped></style>
