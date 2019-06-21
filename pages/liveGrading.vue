<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm6 md3>
        <v-card class="px-3 py-2">
          <v-text-field v-model="searchText" label="Search student" append-icon="fa-search"></v-text-field>
          <v-list two-line>
            <v-list-tile v-if="filteredPapers.length === 0">
              <v-list-tile-content>No results</v-list-tile-content>
            </v-list-tile>
            <template v-for="paper in filteredPapers">
              <v-divider :key="`divider-${paper.id}`"></v-divider>
              <v-list-tile :key="`tile-${paper.id}`" :to="showOnePaper(paper)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ paper.student.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ paper.name }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><v-icon>fa-chevron-right</v-icon></v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm9>
        <v-layout>
          <v-container grid-list-xs>
            <span class="subheading">Previously graded students will appear here</span>

            <v-layout row class="overflow-x-hidden" justify-end reverse>
              <nuxt-link v-for="prev in previous" :key="prev.id" :to="showOnePaper(prev)" tag="v-chip" small>
                {{ prev.name }}
              </nuxt-link>
            </v-layout>
          </v-container>
        </v-layout>
        <v-layout>
          <nuxt-child :other-profs="committee" :grading-categories="gradingCategories"></nuxt-child>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import paths from '../assets/script/paths'

export default {
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('previouslyGraded', ['previous']),
    filteredPapers() {
      return this.papers.filter(paper => paper.student.name.toLowerCase().startsWith(this.searchText.toLowerCase()))
    }
  },
  asyncComputed: {
    papers: {
      get() {
        return this.$axios.$get(this.$endpoint.liveGrading.list())
      },
      default: []
    },
    gradingCategories: {
      get() {
        return this.$axios.$get(this.$endpoint.gradingScheme.get())
      },
      default: []
    },
    committee: {
      async get() {
        const committee = await this.$axios.$get(this.$endpoint.liveGrading.committee())
        return [committee.leader, committee.member1, committee.member2].filter(
          prof => !!prof && prof.id !== this.user.id
        )
      },
      default: []
    }
  },
  methods: {
    showOnePaper(paper) {
      return paths.liveGradingPaper(paper.id)
    }
  }
}
</script>

<style scoped></style>
