<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 md4>
        <v-form>
          <v-checkbox
            v-model="fromAllDevices"
            label="From all devices"
            color="primary"
          ></v-checkbox>
          <AsyncButton block color="primary" @click="logoutPressed">
            Logout
          </AsyncButton>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import AsyncButton from '../components/AsyncButton'

export default {
  components: {
    AsyncButton
  },
  data() {
    return {
      fromAllDevices: false
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),
    logoutPressed(done) {
      return this.logout(this.fromAllDevices).then(() => {
        done()
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped></style>
