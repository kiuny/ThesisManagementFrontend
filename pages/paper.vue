<template>
  <v-container v-if="paper" fluid>
    <v-layout row>
      <v-flex xs3 class="mr-3">
        <v-layout>
          <v-flex>
            <v-card class="mb-3">
              <v-card-title primary-title class="font-weight-bold headline">
                Paper details
              </v-card-title>
              <v-card-text>
                <v-form v-if="editing" @submit.prevent="updatePaper">
                  <v-text-field v-model="paper.name" label="Name your project"></v-text-field>
                  <v-text-field v-model="paper.link" label="Link to your project"></v-text-field>

                  <v-btn type="submit" block color="primary">Update</v-btn>
                  <v-btn v-if="editing" block color="info" @click="cancelEdit">Cancel</v-btn>
                </v-form>
                <template v-else>
                  <h1>
                    {{ paper.name || 'No name set' }}
                    <a v-if="paper.link" :href="paper.link" class="d-inline-flex align-center">
                      <v-icon>fa-external-link-alt</v-icon>
                    </a>
                  </h1>

                  <v-btn block color="primary" @click="startEdit">Edit</v-btn>
                </template>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card class="mb-3">
              <v-card-title primary-title class="font-weight-bold headline">
                Upload new revision
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="uploadRevision">
                  <v-text-field v-model="uploadForm.name" label="Name your revision"></v-text-field>
                  <UploadButton v-model="uploadForm.paperFile" color="accent" block></UploadButton>
                  <v-btn type="submit" block color="primary">Upload</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs-8>
        <v-layout v-for="revision in paper.revisions" :key="`paper-revision-${revision.id}`">
          <v-flex>
            <PaperCard :revision="revision"></PaperCard>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import UploadButton from '../components/UploadButton'
import PaperCard from '../components/RevisionCard'

export default {
  components: { PaperCard, UploadButton },
  data() {
    return {
      editing: false,
      paper: null,
      beforeEdit: {},
      uploadForm: {
        name: '',
        paperFile: null
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  created() {
    this.loadPaper()
  },
  methods: {
    async uploadRevision() {
      const formData = new FormData()

      formData.append('paper', this.uploadForm.paperFile)
      formData.append('name', this.uploadForm.name)

      const revision = await this.$axios.$post(this.$endpoint.papers.upload(this.paper.id), formData)
      this.paper.revisions.push(revision)

      this.uploadForm.name = ''
      this.uploadForm.paperFile = null
    },
    cancelEdit() {
      this.paper.name = this.beforeEdit.name
      this.paper.link = this.beforeEdit.link
      this.editing = false
    },
    startEdit() {
      this.beforeEdit.name = this.paper.name
      this.beforeEdit.link = this.paper.link
      this.editing = true
    },
    async updatePaper() {
      await this.$axios.$post(this.$endpoint.papers.updateDetails(), {
        name: this.paper.name,
        link: this.paper.link
      })
      this.editing = false
    },
    async loadPaper() {
      this.paper = await this.$axios.$get(this.$endpoint.papers.getForStudent(this.user.id))
    }
  }
}
</script>
