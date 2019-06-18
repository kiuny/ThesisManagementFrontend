<template>
  <v-container v-if="examSession" py-0>
    <v-layout>
      <v-flex>
        <GradingScheme :exam-session="examSession"></GradingScheme>
      </v-flex>
    </v-layout>
    <v-layout mt-3>
      <v-flex>
        <CommitteeOrganizer v-if="examSession" :exam-session="examSession"></CommitteeOrganizer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GradingScheme from '../GradingScheme'
import CommitteeOrganizer from '../CommitteeOrganizer'

export default {
  components: { GradingScheme, CommitteeOrganizer },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('examSessions', ['getExamSession']),
    examSession() {
      return this.getExamSession(this.id)
    }
  },
  created() {
    this.loadExamSession(this.id)
  },
  methods: {
    ...mapActions('examSessions', ['loadExamSession'])
  }
}
</script>
