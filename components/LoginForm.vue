<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form>
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            password
            required
          ></v-text-field>
          <AsyncButton :action="login" color="primary" block>Login</AsyncButton>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AsyncButton from './AsyncButton'
export default {
  components: { AsyncButton },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      return new Promise(resolve =>
        setTimeout(() => {
          console.log('500 passed')
          resolve()
        }, 500)
      )
    }
  }
}
</script>

<style scoped></style>
