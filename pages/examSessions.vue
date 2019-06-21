<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="pa-2">
          <v-layout justify-center>
            <v-dialog v-model="dialogOpen" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" class="justify-self-center" v-on="on">Add new exam session</v-btn>
              </template>
              <v-card class="pa-3">
                <v-form @submit.prevent="addExamSession">
                  <v-card-title>Add new exam session</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="name" label="Name"></v-text-field>
                    <v-text-field v-model="department" label="Department(specializare)"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat color="success" type="submit">Save</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="warning" @click="cancelAdd">Cancel</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-layout>
            <v-flex grow>
              <v-list two-line>
                <template v-for="examSession in examSessions">
                  <v-divider :key="`divider-${examSession.id}`"></v-divider>
                  <v-list-tile :key="`tile-${examSession.id}`">
                    <v-list-tile-content>
                      <v-list-tile-title class="font-weight-bold">
                        {{ examSession.presentation_name }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text">{{ examSession.department }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon @click="deleteExamSession(examSession)">
                        <v-icon color="error">fa-trash</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialogOpen: false,
      name: '',
      department: ''
    }
  },
  asyncComputed: {
    examSessions: {
      get() {
        return this.$axios.$get(this.$endpoint.sessions.list)
      },
      default: []
    }
  },
  methods: {
    async deleteExamSession(examSession) {
      await this.$axios.$delete(this.$endpoint.sessions.delete(examSession.name))
      this.$asyncComputed.examSessions.update()
    },
    cancelAdd() {
      this.dialogOpen = false
      this.name = ''
      this.department = ''
    },
    async addExamSession() {
      await this.$axios.$post(this.$endpoint.sessions.create, {
        name: this.name,
        department: this.department
      })
      this.$asyncComputed.examSessions.update()
      this.cancelAdd()
    }
  }
}
</script>

<style scoped></style>
