<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 md4>
        <v-form>
          <v-checkbox v-model="fromAllDevices" label="From all devices" color="primary"></v-checkbox>
          <v-btn block color="primary" @click="logoutPressed">
            Logout
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      fromAllDevices: false
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),
    logoutPressed() {
      return this.logout(this.fromAllDevices).then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped></style>
