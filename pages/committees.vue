<template>
  <v-container mt-2>
    <v-layout justify-center>
      <v-flex>
        <CommitteeOrganizer></CommitteeOrganizer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CommitteeOrganizer from '../components/CommitteeOrganizer'
export default {
  components: { CommitteeOrganizer }
}
</script>

<style scoped></style>
