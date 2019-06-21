<template>
  <v-layout>
    <v-flex v-if="paper">
      <v-layout mx-5 my-2>
        <v-flex>
          <RevisionCard :key="paper.id" :revision="paper.final_revision" :with-chat="false"></RevisionCard>
        </v-flex>
      </v-layout>
      <v-layout mx-5 my-2>
        <v-flex>
          <GradesTable :paper="paper" :grading-categories="gradingCategories" :other-profs="otherProfs"></GradesTable>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import RevisionCard from '../../components/RevisionCard'
import GradesTable from '../../components/GradesTable'

export default {
  components: { RevisionCard, GradesTable },
  props: {
    otherProfs: {
      type: Array,
      required: true
    },
    gradingCategories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      paper: null
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.$axios.$get(this.$endpoint.liveGrading.paperData(this.$route.params.id)).then(data => (this.paper = data))
      },
      immediate: true
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
