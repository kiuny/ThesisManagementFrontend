<template>
  <v-app :dark="darkMode">
    <notifications position="top center"></notifications>

    <v-navigation-drawer :value="drawerOpen" app clipped fixed @input="toggleDrawer">
      <v-list>
        <v-list-tile v-for="item in menuEntries" :key="item.to" :to="item.to" router>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar clipped-left fixed app>
      <v-toolbar-title>
        <v-toolbar-side-icon @click="toggleDrawer">
          <v-icon>fa-bars</v-icon>
        </v-toolbar-side-icon>
        <nuxt-link to="/" class="dashboard-link text--primary">Clever thesis</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-flex v-if="!!user.id" shrink>
        <v-select
          :value="session"
          class="pt-4"
          no-data-text="No session started"
          label="Current session"
          :items="sessions"
          menu-props="bottom, offset-y"
          item-text="presentation_name"
          item-value="name"
          @input="updateSession"
        ></v-select>
      </v-flex>
      <v-btn icon @click="toggleDarkMode">
        <v-icon>fa-moon</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer app>
      <span>&copy; Gavrila Andrei 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('layout', ['menuEntries', 'darkMode', 'drawerOpen']),
    ...mapState('auth', ['user']),
    ...mapState('currentSession', ['session'])
  },
  methods: {
    ...mapMutations('layout', ['toggleDarkMode', 'toggleDrawer']),
    ...mapMutations('currentSession', ['updateSession'])
  },
  asyncComputed: {
    sessions: {
      get() {
        return this.$axios.$get(this.$endpoint.sessions.list)
      },
      shouldUpdate() {
        return !!this.user.id
      }
    }
  }
}
</script>

<style scoped>
.dashboard-link {
  text-decoration: none;
}
</style>
