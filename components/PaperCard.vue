<template>
  <v-card class="pa-2 mb-3">
    <v-card-title>
      <span class="headline">{{ paper.name }}</span>
      <v-btn flat icon alt="Download pdf" color="secondary" @click="downloadPaper"><v-icon>fa-download</v-icon></v-btn>
      <v-spacer></v-spacer>
      <span class="font-italic">Uploaded at: {{ paper.created_at }}</span>
    </v-card-title>
    <v-card-text>
      <div v-if="withReview">
        <v-form>
          <v-textarea></v-textarea>
          <v-checkbox></v-checkbox>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import endpoints from '../assets/script/endpoints'

export default {
  props: {
    paper: {
      type: Object,
      required: true
    },
    withReview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      review: {
        text: '',

      }
    }
  }
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
    }
  }
}
</script>
