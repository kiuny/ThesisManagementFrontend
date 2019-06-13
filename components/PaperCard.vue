<template>
  <v-card class="pa-2 mb-3">
    <v-card-title>
      <span class="headline">{{ paper.name }}</span>
      <v-btn flat icon alt="Download pdf" color="secondary" @click="downloadPaper"><v-icon>fa-download</v-icon></v-btn>
      <v-spacer></v-spacer>
      <span class="font-italic">Uploaded at: {{ paper.created_at }}</span>
    </v-card-title>
    <v-card-text>
      <div class="mb-1">
        <h3 class="d-inline">Discussions</h3>
        <span v-if="comments && comments.length === 0">: None yet</span>
      </div>
      <!-- todo details at some point later -->

      <v-layout v-if="$asyncComputed.comments.updating" justify-center align-center>
        <v-progress-circular indeterminate></v-progress-circular>
      </v-layout>

      <template v-for="comment in comments">
        <v-hover :key="comment.id">
          <v-layout slot-scope="{ hover }">
            <v-flex xs10>
              <v-textarea
                :value="comment.message"
                rows="1"
                flat
                label="Type here"
                class="comment"
                clearable
                auto-grow
              ></v-textarea>
            </v-flex>
            <v-flex v-show="hover && canEdit(comment)">
              <v-layout align-center justify-center column fill-height>
                <v-btn icon @click="startEdit(comment)"><v-icon>fa-pencil-alt</v-icon></v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-hover>
      </template>
      <v-divider></v-divider>
      <v-layout>
        <v-flex xs10>
          <v-textarea
            v-model="newComment"
            rows="1"
            flat
            label="Type here"
            class="comment"
            clearable
            auto-grow
          ></v-textarea>
        </v-flex>
        <v-flex>
          <v-layout align-center justify-center column fill-height>
            <v-btn icon><v-icon>fa-paper-plane</v-icon></v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import endpoints from '../assets/script/endpoints'

export default {
  props: {
    paper: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newComment: '',
      editing: null,
      editingMessage: ''
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    downloadPaper() {
      return this.$axios
        .$get(endpoints.papers.download(this.paper.id), {
          responseType: 'blob'
        })
        .then(data => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', `${this.paper.filename}`)
          link.click()
        })
    },
    canEdit(comment) {
      return comment.user_id === this.user.id
    },
    startEdit(comment) {
      this.editing = comment.id
      this.editingMessage = comment.message
    },
    cancelEdit() {
      this.editing = null
      this.editingMessage = ''
    },
    sendMesssage() {
      this.$axios
        .$post(endpoints.comments.sendMessage(this.paper.id), {
          message: this.message
        })
        .then(() => {
          this.$asyncComputed.comments.update()
        })
    },
    updateComment() {
      this.$axios
        .$post(endpoints.comments.edit(this.editing), {
          message: this.editingMessage
        })
        .then(() => {
          this.$asyncComputed.comments.update()
        })
    },
    deleteComment(comment) {
      this.$axios.$delete(endpoints.comments.delete(comment.id)).then(() => {
        this.$asyncComputed.comments.update()
      })
    }
  },
  asyncComputed: {
    comments() {
      return this.$axios.$get(endpoints.comments.getForPapeer(this.paper.id))
    }
  }
}
</script>

<style>
.comment .v-input__append-outer {
  height: 100%;
}
</style>
