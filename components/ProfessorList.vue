<template>
  <v-card class="px-3 py-2">
    <v-text-field
      ref="email"
      v-model="email"
      color="primary"
      label="Add new professor by email"
      :error-messages="errors.email"
      single-line
      append-outer-icon="add"
      @click:append-outer="addProfessor"
    >
    </v-text-field>

    <v-text-field
      v-model="filter"
      color="secondary"
      label="Search"
      single-line
      append-outer-icon="search"
      clearable
    >
    </v-text-field>
    <v-flex v-if="loadingProfessors" row class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-flex>

    <v-list v-if="!loadingProfessors">
      <template v-for="professor in filteredProfessors">
        <v-divider :key="`divider-${professor.id}`"></v-divider>

        <v-list-tile
          :key="`tile-${professor.id}`"
          @click="goToProfessor(professor.id)"
        >
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
import endpoints from '../assets/script/endpoints'
import paths from '../assets/script/paths'
import errorHandlingMixin from './errorHandlingMixin'

export default {
  mixins: [errorHandlingMixin],
  data() {
    return {
      professors: [],
      email: '',
      filter: '',
      loadingProfessors: false
    }
  },
  computed: {
    filteredProfessors() {
      return this.professors.filter(prof =>
        prof.name.split(' ').some(word => word.startsWith(this.filter))
      )
    }
  },
  created() {
    this.loadProfessors()
  },
  methods: {
    goToProfessor(id) {
      this.$router.push(paths.professor(id))
    },
    loadProfessors() {
      this.loadingProfessors = true
      this.$axios
        .$get(endpoints.professors.index)
        .then(result => {
          this.professors = result
          this.loadingProfessors = false
        })
        .catch(this.errorHandling)
    },
    addProfessor() {
      this.$axios
        .$post(endpoints.professors.create, {
          email: this.email
        })
        .then(() => {
          this.email = ''
          this.loadProfessors()
          this.clearErrors()
        })
        .catch(this.errorHandling)
    }
  }
}
</script>
