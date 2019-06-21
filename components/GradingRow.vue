<template>
  <tr class="text-xs-center">
    <td class="text-xs-right">{{ editable ? 'You' : professor.name }}</td>
    <td v-for="category in flatGradingCategories" :key="category.id">
      <v-text-field
        v-model="grades[category.id].value"
        class="mx-auto grade-input"
        type="number"
        solo-inverted
        flat
        min="1"
        max="10"
        :disabled="!editable"
        @focusout="updateGrade(category)"
        @key.enter.prevent="updateGrade(category)"
      ></v-text-field>
    </td>
    <td>{{ average }}</td>
  </tr>
</template>

<script>
import { calculateAverageRow } from '../assets/script/averageGradeCalculator'

export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    gradingCategories: {
      type: Array,
      required: true
    },
    professor: {
      type: Object,
      required: true
    },
    paper: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    grades: {
      required: true
    }
  },
  computed: {
    flatGradingCategories() {
      return this.gradingCategories.flatMap(category => {
        return category.subcategories.length > 0 ? category.subcategories : [category]
      })
    },
    average() {
      return calculateAverageRow(this.gradingCategories, this.grades).toFixed(2)
    }
  },
  methods: {
    updateGrade(category) {
      this.$axios.$post(this.$endpoint.liveGrading.setGrade(this.paper.id, category.id), {
        value: this.grades[category.id].value
      })

      this.$store.commit('previouslyGraded/addPrevious', this.paper)
    }
  }
}
</script>

<style>
.grade-input {
  width: 4em;
}

grade-input input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.grade-input input {
  -moz-appearance: textfield;
  text-align: center;
}
</style>
