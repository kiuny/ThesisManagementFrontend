<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form>
          <v-text-field-error v-model="name" error="name" label="Name"></v-text-field-error>
          <v-text-field-error v-model="email" error="email" label="Email"></v-text-field-error>
          <v-text-field-error v-model="password" error="password" type="password" label="Password"></v-text-field-error>

          <v-btn color="primary" block @click="register">
            Register
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import paths from '../assets/script/paths'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', {
      getUser: 'getUser'
    }),
    register() {
      return this.$axios
        .$post(this.$endpoint.register, {
          name: this.name,
          email: this.email,
          password: this.name
        })
        .then(this.getUser)
        .then(() => this.$router.push(paths.dashboard))
    }
  }
}
</script>
