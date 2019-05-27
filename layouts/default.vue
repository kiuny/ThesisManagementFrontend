<template>
  <v-app :dark="darkMode">
    <v-navigation-drawer v-model="isDrawerOpen" clipped fixed app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in menuEntries"
          :key="i"
          :to="item.to"
          router
          exact
        >
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
      <v-toolbar-side-icon @click="isDrawerOpen = !isDrawerOpen" />
      <v-toolbar-title>Thesis manager</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleDarkMode">
        <v-icon>fa-moon</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Gavrila Andrei 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      isDrawerOpen: false
    }
  },
  computed: {
    ...mapState('layout', ['menuEntries', 'darkMode'])
  },
  methods: {
    ...mapMutations('layout', ['toggleDarkMode'])
  }
}
</script>
