<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form>
          <v-text-field ref="name" v-model="name" label="Name" :error-messages="errors.name"></v-text-field>
          <v-text-field ref="email" v-model="email" label="Email" :error-messages="errors.email"></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            type="password"
            label="Password"
            :error-messages="errors.password"
          ></v-text-field>

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
import endpoints from '../assets/script/endpoints'
import errorHandlingMixin from '../components/errorHandlingMixin'
import paths from '../assets/script/paths'
export default {
  mixins: [errorHandlingMixin],
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
        .$post(endpoints.register, {
          name: this.name,
          email: this.email,
          password: this.name
        })
        .then(this.getUser)
        .then(() => this.$router.push(paths.dashboard))
        .catch(this.errorHandling)
    }
  }
}
</script>
