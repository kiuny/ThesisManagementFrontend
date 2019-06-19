<template>
  <v-container v-if="professor">
    <v-card>
      <v-layout pa-3 justify-start :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs" align-center>
        <img
          v-if="hasDetails"
          class="mr-3"
          :src="professor.professor_details.image_url"
          :alt="`Image of ${professor.name}`"
        />
        <v-layout column>
          <dl>
            <dt class="caption grey--text">Name</dt>
            <dd>{{ professor.name }}</dd>
            <dt class="caption grey--text">Email</dt>
            <dd>{{ professor.email }}</dd>
            <dt class="caption grey--text">Interests</dt>
            <dd v-if="hasDetails">
              {{ professor.professor_details.interest_domains }}
            </dd>
            <dt class="caption grey--text">Account status</dt>
            <dd :class="{ 'text--red': professor.activated !== '1' }">
              Account
              {{ professor.activated === '1' ? 'activated' : 'not activated' }}
            </dd>
          </dl>
        </v-layout>
      </v-layout>
    </v-card>

    <v-card class="mt-3">
      <v-layout pa-2 :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs" justify-center>
        <v-flex mx-1 shrink align-self-center>
          <v-checkbox
            :input-value="professor.isEvaluator"
            label="Evaluator"
            color="primary"
            @click="toggleEvaluator"
          ></v-checkbox>
        </v-flex>
        <v-flex mx-1 shrink align-self-center>
          <v-checkbox
            :input-value="professor.isCoordinator"
            label="Coordinator"
            color="primary"
            @click="toggleCoordinator"
          ></v-checkbox>
        </v-flex>
        <v-flex mx-1 shrink align-self-center>
          <v-btn @click="reimportData">Reimport details</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '../../assets/script/endpoints'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('professors', ['getProfessor']),
    professor() {
      return this.getProfessor(this.id)
    },
    hasDetails() {
      return !!this.professor.professor_details
    }
  },
  created() {
    this.$store.dispatch('professors/loadProfessor', this.id)
  },
  methods: {
    toggleEvaluator() {
      this.$axios.$post(endpoints.professors.toggleEvaluator(this.id))
    },
    toggleCoordinator() {
      this.$axios.$post(endpoints.professors.toggleCoordinator(this.id))
    },
    reimportData() {
      return this.$axios.$post(endpoints.professors.reimport(this.id))
    }
  }
}
</script>
