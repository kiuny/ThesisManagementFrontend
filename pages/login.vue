<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form>
          <v-text-field
            ref="email"
            v-model="email"
            label="Email"
            :error-messages="errors.email"
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            label="Password"
            type="password"
            :error-messages="errors.password"
          ></v-text-field>
          <v-checkbox
            v-model="rememberMe"
            label="Remember me"
            color="primary"
          ></v-checkbox>
          <AsyncButton block color="primary" @click="loginPressed">
            Login
          </AsyncButton>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import AsyncButton from '../components/AsyncButton'
import errorHandlingMixin from '../components/errorHandlingMixin'

export default {
  components: { AsyncButton },
  mixins: [errorHandlingMixin],
  data() {
    return {
      email: 'admin@admin.com',
      password: 'admin',
      rememberMe: true
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'login'
    }),
    loginPressed(done) {
      return this.login({
        email: this.email,
        password: this.password,
        remember_me: this.remember_me
      })
        .then(() => {
          this.clearErrors()
          done()
        })
        .catch(this.errorHandling)
    }
  }
}
</script>

<style scoped></style>
