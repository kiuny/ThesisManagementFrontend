<template>
  <v-card class="px-3 py-2">
    <v-text-field
      ref="name"
      v-model="name"
      color="primary"
      label="New exam session"
      single-line
      append-outer-icon="fa-plus"
      @click:append-outer="addSession"
    >
    </v-text-field>

    <div v-if="!examSessions" class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list>
      <template v-for="examSession in examSessions">
        <v-divider :key="`divider-${examSession.id}`"></v-divider>
        <v-list-tile :key="`tile-${examSession.id}`" @click="goToSession(examSession.name)">
          <v-list-tile-content v-text="examSession.name"></v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import endpoints from '../../assets/script/endpoints'
import paths from '../../assets/script/paths'

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState('examSessions', ['examSessions'])
  },
  created() {
    this.loadExamSessions()
  },
  methods: {
    ...mapActions('examSessions', ['loadExamSessions']),
    addSession() {
      this.$axios.$post(endpoints.sessions.create, { name: this.name })
    },
    deleteSession(id) {
      this.$axios.$delete(endpoints.sessions.delete(id))
    },
    goToSession(id) {
      this.$router.push(paths.session(id))
    }
  }
}
</script>

<style scoped></style>
