<template>
  <v-card class="px-3 py-2">
    <v-text-field
      ref="email"
      v-model="email"
      color="primary"
      label="Add new professor by email"
      single-line
      append-outer-icon="fa-plus"
      @click:append-outer="addProfessor"
    >
    </v-text-field>

    <v-text-field v-model="filter" color="secondary" label="Search" single-line append-outer-icon="fa-search" clearable>
    </v-text-field>
    <v-flex v-if="!professors" row class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-flex>

    <v-list>
      <template v-for="professor in professors">
        <v-divider :key="`divider-${professor.id}`"></v-divider>

        <v-list-tile :key="`tile-${professor.id}`" @click="goToProfessor(professor.id)">
          <v-list-tile-content v-text="professor.name"></v-list-tile-content>
          <v-list-tile-action>
            <v-icon>fa-chevron-right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>

      <v-list-tile v-if="filteredProfessors.length === 0">
        <v-list-tile-content>No professors found</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import filter from 'lodash/filter'
import endpoints from '../../assets/script/endpoints'
import paths from '../../assets/script/paths'

export default {
  data() {
    return {
      email: '',
      filter: ''
    }
  },
  computed: {
    ...mapState('professors', ['professors']),
    filteredProfessors() {
      return filter(this.professors, prof => prof.name.split(' ').some(word => word.startsWith(this.filter)))
    }
  },
  created() {
    this.$store.dispatch('professors/loadProfessors')
  },
  methods: {
    goToProfessor(id) {
      this.$router.push(paths.professor(id))
    },
    addProfessor() {
      this.$axios
        .$post(endpoints.professors.create, {
          email: this.email
        })
        .then(() => (this.email = ''))
    }
  }
}
</script>
