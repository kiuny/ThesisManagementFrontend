<template>
  <v-container fluid fill-height>
    <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs" :reverse="$vuetify.breakpoint.xs">
      <v-flex xs12 sm3 :row="$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.smAndUp">
        <ProfessorList></ProfessorList>
      </v-flex>
      <v-flex xs12 sm9 :row="$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.smAndUp">
        <nuxt-child></nuxt-child>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfessorList from '../components/professor/ProfessorList'
export default {
  components: { ProfessorList }
}
</script>

<style scoped></style>
