<template>
  <Student :id="$route.params.id" :key="`student-card-${$route.params.id}`"></Student>
</template>

<script>
import Student from '../../components/student/Student'
export default {
  components: { Student },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
