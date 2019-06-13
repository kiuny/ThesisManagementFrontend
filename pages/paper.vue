<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm4 md2>
        <v-card class="mb-3">
          <v-card-title primary-title class="font-weight-bold headline">
            Upload new paper
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="uploadPaper">
              <v-text-field
                ref="name"
                v-model="name"
                :error-messages="errors.name"
                label="Name your paper"
              ></v-text-field>

              <UploadButton v-model="paperFile" color="accent" block></UploadButton>
              <v-btn type="submit" block color="primary">Upload</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md8 offset-sm1>
        <paper-card v-for="paper in papers" :key="paper.id" :paper="paper"></paper-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import errorHandlingMixin from '../components/errorHandlingMixin'
import UploadButton from '../components/UploadButton'
import endpoints from '../assets/script/endpoints'
import PaperCard from '../components/PaperCard'

export default {
  components: { PaperCard, UploadButton },
  mixins: [errorHandlingMixin],
  data() {
    return {
      name: '',
      paperFile: null
    }
  },
  methods: {
    uploadPaper() {
      const formData = new FormData()

      formData.append('paper', this.paperFile)
      formData.append('name', this.name)

      this.$axios
        .$post(endpoints.papers.upload, formData)
        .then(() => {
          this.name = ''
          this.paperFile = null

          this.clearErrors()
          this.$asyncComputed.papers.update()
        })
        .catch(this.errorHandling)
    }
  },
  asyncComputed: {
    papers() {
      return this.$axios.$get(endpoints.papers.getMine)
    }
  }
}
</script>

<style scoped></style>
