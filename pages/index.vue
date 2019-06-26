<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-space-around>
      <v-flex v-for="entry in menuEntries" :key="entry.to" xs2>
        <v-card>
          <v-card-title>{{ entry.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('layout', ['menuEntries'])
  }
}
</script>
