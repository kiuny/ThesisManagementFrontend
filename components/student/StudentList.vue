<template>
  <v-card class="px-3 py-2">
    <v-text-field
      v-model="email"
      color="primary"
      label="Add new student by email"
      single-line
      append-outer-icon="fa-plus"
      @click:append-outer="addStudent"
    >
    </v-text-field>

    <v-text-field v-model="filter" color="secondary" label="Search" single-line append-outer-icon="fa-search" clearable>
    </v-text-field>
    <v-flex v-if="!students" row class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-flex>

    <v-list>
      <template v-for="student in filteredStudents">
        <v-divider :key="`divider-${student.id}`"></v-divider>

        <v-list-tile :key="`tile-${student.id}`" :to="goToStudent(student.id)">
          <v-list-tile-content v-text="student.name"></v-list-tile-content>
          <v-list-tile-action>
            <v-icon>fa-chevron-right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>

      <v-list-tile v-if="filteredStudents.length === 0">
        <v-list-tile-content>No students found</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import filter from 'lodash/filter'
import paths from '../../assets/script/paths'

export default {
  data() {
    return {
      email: '',
      filter: ''
    }
  },
  computed: {
    ...mapState('students', ['students']),
    filteredStudents() {
      return filter(this.students, student => student.name.split(' ').some(word => word.startsWith(this.filter)))
    }
  },
  created() {
    this.$store.dispatch('students/loadStudents')
  },
  methods: {
    goToStudent(id) {
      return paths.student(id)
    },
    addStudent() {
      this.$axios
        .$post(this.$endpoint.students.create, {
          email: this.email
        })
        .then(() => this.$store.dispatch('students/loadStudents'))
        .then(() => (this.email = ''))
    }
  }
}
</script>
