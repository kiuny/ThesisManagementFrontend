<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form>
          <v-text-field-error v-model="email" error="email" label="Email"></v-text-field-error>
          <v-text-field-error v-model="password" error="password" label="Password" type="password"></v-text-field-error>
          <v-checkbox v-model="rememberMe" label="Remember me" color="primary"></v-checkbox>
          <v-btn block color="primary" @click="loginPressed">Login</v-btn>
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
      email: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'login'
    }),
    loginPressed() {
      return this.login({
        email: this.email,
        password: this.password,
        remember_me: this.remember_me
      })
    }
  }
}
</script>

<style scoped></style>
