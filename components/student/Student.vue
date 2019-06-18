<template>
  <v-container v-if="student" pt-0>
    <v-card>
      <v-layout pa-3 justify-start :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs" align-center>
        <v-flex>
          <dl>
            <dt class="caption grey--text">Name</dt>
            <dd>{{ student.name }}</dd>
            <dt class="caption grey--text">Email</dt>
            <dd>{{ student.email }}</dd>
            <dt class="caption grey--text">Account status</dt>
            <dd :class="{ 'text--red': student.activated !== '1' }">
              Account
              {{ student.activated === '1' ? 'activated' : 'not activated' }}
            </dd>
          </dl>
          <FinalReviewModal :student="student"></FinalReviewModal>
        </v-flex>
      </v-layout>
    </v-card>

    <template v-if="student.paper">
      <RevisionCard
        v-for="revision in student.paper.revisions"
        :key="revision.id"
        class="mt-1"
        :revision="revision"
      ></RevisionCard>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RevisionCard from '../RevisionCard'
import FinalReviewModal from '../FinalReviewModal'

export default {
  components: { FinalReviewModal, RevisionCard },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('students', ['getStudent']),
    student() {
      return this.getStudent(this.id)
    }
  },
  created() {
    this.$store.dispatch('students/loadStudent', this.id)
  }
}
</script>
