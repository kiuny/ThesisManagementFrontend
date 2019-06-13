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

    <template v-if="papers">
      <PaperCard class="mt-1" v-for="paper in papers" :key="paper.id" :paper="paper"></PaperCard>
    </template>
  </v-container>
</template>

<script>
import endpoints from '../../assets/script/endpoints'
import PaperCard from '../PaperCard'

export default {
  components: { PaperCard },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  asyncComputed: {
    student: {
      get() {
        return this.$axios.$get(endpoints.students.get(this.id))
      }
    },
    papers() {
      return this.$axios.$get(endpoints.papers.getForUser(this.id))
    }
  }
}
</script>
