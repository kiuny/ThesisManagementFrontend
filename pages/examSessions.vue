<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm6 md4>
        <v-text-field
          ref="id"
          v-model="id"
          color="primary"
          label="New exam session"
          :error-messages="errors.id"
          single-line
          append-outer-icon="add"
          @click:append-outer="addSession"
        >
        </v-text-field>

        <div v-if="loading" class="text-xs-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
        <v-list v-if="!loading && examSessions.length">
          <v-list-tile
            v-for="examSession in examSessions"
            :key="examSession.id"
          >
            <v-list-tile-content v-text="examSession.id"></v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="deleteSession(examSession.id)">
                <v-icon color="warning">fa-trash-alt</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import endpoints from '../assets/script/endpoints'
import errorHandlingMixin from '../components/errorHandlingMixin'

export default {
  mixins: [errorHandlingMixin],
  data() {
    return {
      examSessions: [],
      loading: false,
      id: ''
    }
  },
  created() {
    this.loadExamSessions()
  },
  methods: {
    loadExamSessions() {
      this.loading = true
      this.$axios
        .$get(endpoints.sessions.index)
        .then(value => {
          this.examSessions = value
          this.loading = false
          this.errors = {}
          console.log(this.examSessions.length)
        })
        .catch(this.errorHandling)
    },
    addSession() {
      this.$axios
        .$post(endpoints.sessions.create, { id: this.id })
        .then(this.loadExamSessions)
        .catch(this.errorHandling)
    },
    deleteSession(id) {
      this.$axios
        .$delete(endpoints.sessions.delete(id))
        .then(this.loadExamSessions)
        .catch(this.errorHandler)
    }
  }
}
</script>

<style scoped></style>
