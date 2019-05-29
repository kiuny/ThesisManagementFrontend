<template>
  <v-container fluid fill-height>
    <v-layout
      :row="$vuetify.breakpoint.smAndUp"
      :column="$vuetify.breakpoint.xs"
      :reverse="$vuetify.breakpoint.xs"
    >
      <v-flex
        xs12
        sm3
        :row="$vuetify.breakpoint.xs"
        :column="$vuetify.breakpoint.smAndUp"
      >
        <ProfessorsList v-model="selectedProfessor"></ProfessorsList>
      </v-flex>
      <v-flex
        xs12
        sm9
        :row="$vuetify.breakpoint.xs"
        :column="$vuetify.breakpoint.smAndUp"
      >
        <Professor :professor="selectedProfessor"></Professor>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfessorsList from '../components/ProfessorList'
import Professor from '../components/Professor'

export default {
  components: {
    ProfessorsList,
    Professor
  },
  data() {
    return {
      selectedProfessor: null
    }
  }
}
</script>

<style scoped></style>
