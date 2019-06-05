<template>
  <Student :id="$route.params.id"></Student>
</template>

<script>
import Student from '../../components/Student'
export default {
  components: { Student },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
