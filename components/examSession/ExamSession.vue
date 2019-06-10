<template>
  <v-container py-0>
    <v-layout row>
      <v-flex>
        <GradingScheme :exam-session="$route.params.id"></GradingScheme>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GradingScheme from '../GradingScheme'

export default {
  components: { GradingScheme }
}
</script>
