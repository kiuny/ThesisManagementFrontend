<template>
  <v-card class="pa-2">
    <v-card-title class="headline">Give grades to {{ paper.student.name }}</v-card-title>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <th rowspan="2"></th>
            <th
              v-for="category in gradingCategories"
              :key="category.id"
              :rowspan="category.subcategories.length === 0 ? 2 : 1"
              :colspan="category.subcategories.length > 0 ? category.subcategories.length : 1"
            >
              {{ category.name }} ({{ category.points }}p)
            </th>
            <th rowspan="2">Average</th>
          </tr>
          <tr>
            <template v-for="category in gradingCategories">
              <th v-for="subcategory in category.subcategories" :key="subcategory.id">
                {{ subcategory.name }} ({{ subcategory.points }}p)
              </th>
            </template>
          </tr>
        </thead>
        <tbody v-if="grades">
          <GradingRow
            :professor="user"
            editable
            :grading-categories="gradingCategories"
            :grades="grades[user.id]"
            :paper="paper"
          ></GradingRow>
          <template v-if="otherProfs">
            <GradingRow
              v-for="prof in otherProfs"
              :key="prof.id"
              :professor="prof"
              :grading-categories="gradingCategories"
              :grades="grades[prof.id]"
              :paper="paper"
            ></GradingRow>
          </template>
          <tr>
            <td :colspan="numberOfColumns + 1"></td>
            <td class="text-xs-center">{{ totalAverage }}</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { calculateAverageRow } from '../assets/script/averageGradeCalculator'
import GradingRow from './GradingRow'
export default {
  components: { GradingRow },
  props: {
    paper: {
      type: Object,
      required: true
    },
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
      grades: null
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    numberOfColumns() {
      return this.gradingCategories.reduce((acc, cat) => {
        return acc + (cat.subcategories.length || 1)
      }, 0)
    },
    totalAverage() {
      return (
        Object.values(this.grades)
          .map(gradeRow => calculateAverageRow(this.gradingCategories, gradeRow))
          .reduce((acc, v) => acc + v, 0) / 3
      ).toFixed(2)
    }
  },
  watch: {
    paper: {
      handler(newVal, oldVal) {
        this.loadGrades()
        if (oldVal) this.$echo.private(`grades.${oldVal.id}`).stopListening('GradesUpdated')
      },
      immediate: true
    }
  },
  methods: {
    async loadGrades() {
      this.grades = await this.$axios.$get(this.$endpoint.liveGrading.grades(this.paper.id))
      this.$echo.private(`grades.${this.paper.id}`).listen('GradesUpdated', ({ grades }) => {
        this.grades = grades
      })
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  column-width: fit-content;
  table-layout: fixed;
}
</style>
