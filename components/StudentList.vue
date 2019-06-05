<template>
  <v-card class="px-3 py-2">
    <v-text-field
      ref="email"
      v-model="email"
      color="primary"
      label="Add new student by email"
      :error-messages="errors.email"
      single-line
      append-outer-icon="add"
      @click:append-outer="addStudent"
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
    <v-flex v-if="$asyncComputed.students.updating" row class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-flex>

    <v-list v-if="$asyncComputed.students.success">
      <template v-for="student in filteredStudents">
        <v-divider :key="`divider-${student.id}`"></v-divider>

        <v-list-tile
          :key="`tile-${student.id}`"
          @click="goToStudent(student.id)"
        >
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
import endpoints from '../assets/script/endpoints'
import paths from '../assets/script/paths'
import errorHandlingMixin from './errorHandlingMixin'

export default {
  mixins: [errorHandlingMixin],
  data() {
    return {
      email: '',
      filter: ''
    }
  },
  asyncComputed: {
    async students() {
      return this.$axios.$get(endpoints.students.index)
    }
  },
  computed: {
    filteredStudents() {
      // if (!this.$asyncComputed.students.success) {
      //   return []
      // }
      return this.students.filter(student =>
        student.name.split(' ').some(word => word.startsWith(this.filter))
      )
    }
  },
  methods: {
    goToStudent(id) {
      this.$router.push(paths.student(id))
    },
    addStudent() {
      this.$axios
        .$post(endpoints.students.create, {
          email: this.email
        })
        .then(() => {
          this.email = ''
          this.$asyncComputed.students.update()
          this.clearErrors()
        })
        .catch(this.errorHandling)
    }
  }
}
</script>
