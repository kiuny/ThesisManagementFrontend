<template>
  <v-container v-if="student" pt-0>
    <v-card>
      <v-layout pa-3 justify-start :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs" align-center>
        <v-layout column>
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
        </v-layout>
      </v-layout>
    </v-card>

    <PaperCard v-for="paper in student.papers" :key="paper.id" class="mt-1" :paper="paper"></PaperCard>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PaperCard from '../PaperCard'

export default {
  components: { PaperCard },
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
