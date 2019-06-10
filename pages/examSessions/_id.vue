<template>
  <ExamSession :id="$route.params.id"></ExamSession>
</template>

<script>
import ExamSession from '../../components/examSession/ExamSession'
export default {
  components: { ExamSession },
  validate({ params }) {
    return params.id.length > 0
  }
}
</script>

<style scoped></style>
