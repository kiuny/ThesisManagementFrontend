<template>
  <v-card class="pa-2 mb-3">
    <v-card-title>
      <span class="headline">{{ revision.name }}</span>
      <v-btn flat icon alt="Download pdf" color="secondary" @click="downloadPaper"><v-icon>fa-download</v-icon></v-btn>
      <v-spacer></v-spacer>
      <span class="font-italic">Uploaded at: {{ revision.created_at }}</span>
    </v-card-title>
    <v-card-text>
      <template v-if="withChat">
        <Comment v-for="comment in comments" :key="`comment-${comment.id}`" :comment="comment"></Comment>
        <v-form ref="sendMessageForm" tag="v-form" @submit.prevent="sendMessage">
          <v-layout>
            <v-flex>
              <v-textarea
                v-model="message"
                auto-grow
                rows="1"
                clearable
                label="Send a message"
                @keypress.enter.exact="sendMessage"
              ></v-textarea>
            </v-flex>
            <v-flex class="shrink">
              <v-btn type="submit" icon><v-icon>fa-paper-plane</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import endpoints from '../assets/script/endpoints'
import Comment from './Comment'

export default {
  components: { Comment },
  props: {
    revision: {
      type: Object,
      required: true
    },
    withChat: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      comments: [],
      message: ''
    }
  },
  created() {
    if (this.withChat) {
      this.loadChat()
    }
  },
  methods: {
    downloadPaper() {
      return this.$axios
        .$get(endpoints.papers.download(this.revision.id), {
          responseType: 'blob'
        })
        .then(data => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', `${this.revision.filename}`)
          link.click()
        })
    },
    async sendMessage() {
      this.comments.push(
        await this.$axios.$post(endpoints.comments.sendMessage(this.revision.id), { message: this.message })
      )
      this.message = ''
    },
    async loadChat() {
      this.comments = await this.$axios.$get(endpoints.comments.getForRevision(this.revision.id))

      this.$echo
        .private(`chat.${this.revision.id}`)
        .listen('CommentCreated', ({ comment }) => this.comments.push(comment))
        .listen(
          'CommentDeleted',
          ({ comment }) => (this.comments = this.comments.filter(comm => comm.id !== comment.id))
        )
    }
  }
}
</script>
