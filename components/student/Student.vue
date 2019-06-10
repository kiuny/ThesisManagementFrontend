<template>
  <v-container v-if="student">
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
  </v-container>
</template>

<script>
import endpoints from '../../assets/script/endpoints'

export default {
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
    }
  }
}
</script>
