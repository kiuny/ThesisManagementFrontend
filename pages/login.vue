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
          <AsyncButton :action="loginPressed" color="primary" block
            >Login
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
      password: 'admin'
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'login'
    }),
    loginPressed() {
      return this.login({
        email: this.email,
        password: this.password
      })
        .then(this.clearErrors)
        .catch(this.errorHandling)
    }
  }
}
</script>

<style scoped></style>
