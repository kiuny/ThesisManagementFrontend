<template>
  <Professor :id="$route.params.id" :key="`professor-card-${$route.params.id}`"></Professor>
</template>

<script>
import Professor from '../../components/professor/Professor'
export default {
  components: { Professor },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
