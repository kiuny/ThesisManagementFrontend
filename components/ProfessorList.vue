<template>
  <div>
    <v-text-field
      ref="email"
      v-model="email"
      color="primary"
      label="New prof. email"
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
    <v-flex row class="text-xs-center">
      <v-progress-circular
        v-if="loadingProfessors"
        indeterminate
      ></v-progress-circular>
    </v-flex>

    <v-list v-if="!loadingProfessors">
      <v-list-tile
        v-for="professor in filteredProfessors"
        :key="professor.id"
        :color="isSelected(professor) ? 'primary' : ''"
          @click="$emit('input', professor)"
      >
        <v-list-tile-content v-text="professor.name"></v-list-tile-content>
        <v-list-tile-action>
          <v-icon>fa-chevron-right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import endpoints from '../assets/script/endpoints'
import errorHandlingMixin from './errorHandlingMixin'

export default {
  mixins: [errorHandlingMixin],
  props: {
    value: {
      required: true,
      type: Object
    }
  },
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
        })
        .catch(this.errorHandling)
    },
    isSelected(professor) {
      return this.value && this.value.id === professor.id
    }
  }
}
</script>
