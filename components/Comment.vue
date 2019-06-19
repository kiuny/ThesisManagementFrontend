<template>
  <v-layout my-2>
    <v-flex v-if="deleting" row class="text-xs-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-flex>
    <v-hover v-else>
      <v-flex slot-scope="{ hover }">
        <v-divider></v-divider>
        <v-layout style="min-height: 50px;">
          <v-flex xs1 class="align-self-center">{{ whoSaidIt }}</v-flex>
          <v-divider vertical></v-divider>
          <v-flex pa-2 xs10>
            <span v-if="!editing" style="white-space: pre-wrap">{{ comment.message }}</span>
            <v-textarea
              v-else
              v-model="comment.message"
              auto-grow
              rows="1"
              clearable
              flat
              single-line
              label="Edit message"
              @keypress.enter.exact="updateMessage"
            ></v-textarea>
          </v-flex>
          <v-flex v-if="hover" xs1 class="align-self-center text-xs-center">
            <v-btn v-if="!editing" icon @click="startEdit"><v-icon color="info">fa-pencil-alt</v-icon></v-btn>
            <v-btn v-else icon @click="updateMessage"><v-icon color="success">fa-save</v-icon></v-btn>
            <v-btn v-if="!editing" icon @click="deleteMessage"><v-icon color="error">fa-trash</v-icon></v-btn>
            <v-btn v-else icon @click="cancelEdit"><v-icon color="warning">fa-times</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-hover>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import endpoints from '../assets/script/endpoints'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      beforeEdit: '',
      deleting: false
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    whoSaidIt() {
      return this.comment.user.id === this.user.id ? 'You' : this.comment.user.name
    }
  },
  created() {
    this.$echo
      .private(`chat.${this.comment.paper_revision_id}`)
      .listen(`CommentUpdated.${this.comment.id}`, ({ comment }) => {
        this.comment.message = comment.message
      })
  },
  methods: {
    startEdit() {
      this.editing = true
      this.beforeEdit = this.comment.message
    },
    cancelEdit() {
      this.editing = false
      this.comment.message = this.beforeEdit
    },
    async updateMessage() {
      this.editing = false
      await this.$axios.$post(endpoints.comments.update(this.comment.id), {
        message: this.comment.message
      })
    },
    async deleteMessage() {
      this.deleting = true
      await this.$axios.$delete(endpoints.comments.delete(this.comment.id))
    }
  }
}
</script>

<style scoped></style>
