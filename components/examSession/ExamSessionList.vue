<template>
  <v-card class="px-3 py-2">
    <v-text-field
      ref="name"
      v-model="name"
      color="primary"
      label="New exam session"
      :error-messages="errors.name"
      single-line
      append-outer-icon="fa-plus"
      @click:append-outer="addSession"
    >
    </v-text-field>

    <div v-if="$asyncComputed.examSessions.updating" class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-list v-if="$asyncComputed.examSessions.success && examSessions.length">
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
import endpoints from '../../assets/script/endpoints'
import errorHandlingMixin from '../../components/errorHandlingMixin'
import paths from '../../assets/script/paths'

export default {
  mixins: [errorHandlingMixin],
  data() {
    return {
      name: ''
    }
  },
  asyncComputed: {
    async examSessions() {
      return this.$axios
        .$get(endpoints.sessions.index)
        .then(this.clearErrors)
        .catch(this.errorHandling)
    }
  },
  methods: {
    addSession() {
      this.$axios
        .$post(endpoints.sessions.create, { name: this.name })
        .then(this.$asyncComputed.examSessions.update())
        .catch(this.errorHandling)
    },
    deleteSession(id) {
      this.$axios
        .$delete(endpoints.sessions.delete(id))
        .then(this.$asyncComputed.examSessions.update())
        .catch(this.errorHandling)
    },
    goToSession(id) {
      this.$router.push(paths.session(id))
    }
  }
}
</script>

<style scoped></style>
