<template>
  <v-container v-if="professor">
    <v-card>
      <v-layout
        pa-3
        justify-start
        :row="$vuetify.breakpoint.smAndUp"
        :column="$vuetify.breakpoint.xs"
        align-center
      >
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
      <v-layout
        pa-2
        :row="$vuetify.breakpoint.smAndUp"
        :column="$vuetify.breakpoint.xs"
        justify-center
      >
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
          <AsyncButton @click="reimportData">Reimport details</AsyncButton>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import endpoints from '../../assets/script/endpoints'
import AsyncButton from '../AsyncButton'

export default {
  components: { AsyncButton },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    hasDetails() {
      return !!this.professor.professor_details
    }
  },
  methods: {
    toggleEvaluator() {
      this.$axios
        .$post(endpoints.professors.toggleEvaluator(this.id))
        .then(() => this.$asyncComputed.professor.update())
    },
    toggleCoordinator() {
      this.$axios
        .$post(endpoints.professors.toggleCoordinator(this.id))
        .then(() => this.$asyncComputed.professor.update())
    },
    reimportData(done) {
      return this.$axios
        .$post(endpoints.professors.reimport(this.id))
        .then(this.$asyncComputed.professor.update)
        .then(done)
    }
  },
  asyncComputed: {
    professor: {
      get() {
        return this.$axios.$get(endpoints.professors.get(this.id))
      },
      shouldUpdate() {
        return !!this.id
      }
    }
  }
}
</script>
